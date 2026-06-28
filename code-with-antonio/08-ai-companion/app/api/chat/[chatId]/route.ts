import { StreamingTextResponse } from 'ai'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { MemoryManager } from '@/lib/memory'
import { rateLimit } from '@/lib/rate-limit'
import prismadb from '@/libs/prismadb'

const GROQ_MODEL = 'llama-3.1-8b-instant'

type GroqChatCompletion = {
    choices?: {
        message?: {
            content?: string
        }
    }[]
    error?: {
        message?: string
    }
}

export async function POST(request: Request, { params }: { params: { chatId: string } }) {
    try {
        const { prompt } = await request.json()
        const user = await currentUser()

        if (!user || !user.firstName || !user.id) {
            return new NextResponse('Unauth', { status: 401 })
        }

        const identifier = request.url + '-' + user.id
        const { success } = await rateLimit(identifier)

        if (!success) {
            return new NextResponse('Rate limit exceeded', { status: 429 })
        }

        const companion = await prismadb.companion.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: 'user',
                        userId: user.id,
                    },
                },
            },
        })

        if (!companion) {
            return new NextResponse('Companion not found', { status: 404 })
        }

        const name = companion.id
        const companion_file_name = name + '.txt'

        const companionKey = {
            companionName: name,
            userId: user.id,
            modelName: 'llama2-13b',
        }

        const memoryManager = await MemoryManager.getInstance()

        const records = await memoryManager.readLatestHistory(companionKey)

        if (records.length === 0) {
            await memoryManager.seedChatHistory(companion.seed, '\n\n', companionKey)
        }

        await memoryManager.writeToHistory('User: ' + prompt + '\n', companionKey)

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey)

        const similarDocs = await memoryManager.vectorSearch(recentChatHistory, companion_file_name)

        let relevantHistory = ''

        if (!!similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map(doc => doc.pageContent).join('\n')
        }

        let resp = ''

        try {
            const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: GROQ_MODEL,
                    messages: [
                        {
                            role: 'user',
                            content: `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

        ${companion.instructions}

        Below are relevant details about ${companion.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${companion.name}:`,
                        },
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                }),
            })

            const groqData = (await groqResponse.json()) as GroqChatCompletion

            if (!groqResponse.ok) {
                throw new Error(groqData.error?.message || 'Groq request failed')
            }

            resp = groqData.choices?.[0]?.message?.content || ''
        } catch (error) {
            console.log('{CHAT_POST_GROQ}', error)

            if (error instanceof Error && error.message.includes('rate_limit')) {
                return new NextResponse('Groq rate limit exceeded', { status: 429 })
            }

            return new NextResponse('Failed to generate response', { status: 500 })
        }

        const cleaned = resp.replaceAll(',', '')
        const chuncks = cleaned.split('\n')
        const response = chuncks[0]

        await memoryManager.writeToHistory('' + response.trim(), companionKey)
        var Readable = require('stream').Readable

        let s = new Readable()
        s.push(response)
        s.push(null)

        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory('' + response.trim(), companionKey)

            await prismadb.companion.update({
                where: {
                    id: params.chatId,
                },
                data: {
                    messages: {
                        create: {
                            content: response.trim(),
                            role: 'system',
                            userId: user.id,
                        },
                    },
                },
            })
        }

        return new StreamingTextResponse(s)
    } catch (error) {
        console.log('{CHAT_POST}', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
