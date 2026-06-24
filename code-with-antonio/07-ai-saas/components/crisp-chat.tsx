'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('e03546c0-3c79-47d7-bb02-f2515f181597')
    }, [])

    return null
}
