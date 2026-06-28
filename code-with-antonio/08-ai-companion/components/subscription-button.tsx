'use client'

import { Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface SubscriptionButtonProps {
    isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Somathing went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button disabled={loading} onClick={onClick} size="sm" variant={isPro ? 'default' : 'premium'}>
            {isPro ? 'Manage Subscription' : 'Upgrade'}
            {!isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}

export default SubscriptionButton
