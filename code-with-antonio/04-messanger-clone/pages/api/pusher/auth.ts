import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { pusherServer } from '@/app/libs/pusher'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function handler(request: NextApiRequest, responce: NextApiResponse) {
    const session = await getServerSession(request, responce, authOptions)

    if (!session?.user?.email) {
        return responce.status(401)
    }

    const socketId = request.body.socket_id
    const channel = request.body.channel_name
    const data = {
        user_id: session.user.email,
    }

    const authResponce = pusherServer.authorizeChannel(socketId, channel, data)

    return responce.send(authResponce)
}
