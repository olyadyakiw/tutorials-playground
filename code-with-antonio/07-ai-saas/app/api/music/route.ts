import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || '',
})

const REPLICATE_MODEL_OWNER = 'resemble-ai'
const REPLICATE_MODEL_NAME = 'chatterbox'

const getAudioUrl = (output: unknown): string | null => {
    if (typeof output === 'string') {
        return output
    }

    if (Array.isArray(output)) {
        return output.find((item): item is string => typeof item === 'string') || null
    }

    if (output && typeof output === 'object') {
        const result = output as { audio?: unknown; url?: unknown; output?: unknown }

        if (typeof result.audio === 'string') {
            return result.audio
        }

        if (typeof result.url === 'string') {
            return result.url
        }

        return getAudioUrl(result.output)
    }

    return null
}

const getErrorMessage = async (error: unknown) => {
    if (error instanceof Error) {
        return error.message
    }

    if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: Response }).response

        if (response) {
            return `Replicate request failed with status ${response.status} ${response.statusText}`
        }
    }

    return 'Unknown Replicate error'
}

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt } = body

        if (!userId) {
            return new NextResponse('Unauth', { status: 401 })
        }

        if (!process.env.REPLICATE_API_TOKEN) {
            return new NextResponse('Replicate API token not configured', { status: 500 })
        }

        if (!prompt) {
            return new NextResponse('Prompt are required', { status: 400 })
        }

        const model = await replicate.models.get(REPLICATE_MODEL_OWNER, REPLICATE_MODEL_NAME)
        const version = model.latest_version?.id

        if (!version) {
            return new NextResponse('Replicate model version not found', { status: 500 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse('Free trual has exipred.', { status: 403 })
        }

        const output = await replicate.run(`${REPLICATE_MODEL_OWNER}/${REPLICATE_MODEL_NAME}:${version}`, {
            input: {
                prompt,
            },
        })

        const audio = getAudioUrl(output)

        if (!audio) {
            return new NextResponse('No audio returned from Replicate', { status: 500 })
        }

        if (!isPro) await increaseApiLimit()

        return NextResponse.json({ audio })
    } catch (error) {
        const message = await getErrorMessage(error)

        console.log('MUSIC_ERROR', message)
        return new NextResponse(message, { status: 500 })
    }
}
