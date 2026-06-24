import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt, amount = 1, resolution = '1024x1024' } = body

        if (!userId) {
            return new NextResponse('Unauth', { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse('OpenAI API Key not configured', { status: 500 })
        }

        if (!prompt) {
            return new NextResponse('Prompt are required', { status: 400 })
        }
        if (!amount) {
            return new NextResponse('Amount are required', { status: 400 })
        }
        if (!resolution) {
            return new NextResponse('Resolution are required', { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse('Free trual has exipred.', { status: 403 })
        }

        const responce = await openai.createImage({
            model: 'gpt-image-2',
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        } as any)

        if (!isPro) await increaseApiLimit()

        return NextResponse.json(responce.data.data)
    } catch (error: any) {
        console.log('IMAGE_ERROR', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
