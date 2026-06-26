import prismadb from '@/libs/prismadb'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { companionId: string } }) {
    try {
        const body = await req.json()
        const user = await currentUser()
        const { src, name, description, instructions, seed, categoryId } = body

        if (!params.companionId) {
            return new NextResponse('Companion ID is required')
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse('Unauth', { status: 401 })
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse('Missibg required fields', { status: 400 })
        }

        // TODO Check for subscription

        const companion = await prismadb.companion.update({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
            },
            where: {
                id: params.companionId,
            },
        })

        return NextResponse.json(companion)
    } catch (error) {
        console.log('[COMPANION_PATCH]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
