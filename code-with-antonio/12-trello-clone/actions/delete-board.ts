'use client'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteBoard(id: string) {
    await db.board.delete({
        where: {
            id,
        },
    })

    revalidatePath('/organization/org_3Gu2clzL9i58pv957Y3eaH3qhcD')
}
