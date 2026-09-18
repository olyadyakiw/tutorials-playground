import { auth } from '@clerk/nextjs'

const adminIds = ['user_3ISBS01MmVZproLaS0b2W65VRYQ']

export const isAdmin = () => {
    const { userId } = auth()

    if (!userId) {
        return false
    }

    return adminIds.indexOf(userId) !== -1
}
