'use client'

import { Companion, Message } from '@prisma/client'
import ChatHeader from '../../../../../../components/chat-header'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useCompletion } from 'ai/react'
import ChatForm from '../../../../../../components/chat-form'
import ChatMessages from '../../../../../../components/chat-messages'
import { ChatMessageProps } from '@/components/chat-message'
import { useToast } from '@/hooks/use-toast'

interface ChatClientProps {
    companion: Companion & {
        messages: Message[]
        _count: {
            messages: number
        }
    }
}

const ChatClient = ({ companion }: ChatClientProps) => {
    const router = useRouter()
    const { toast } = useToast()
    const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages)

    const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(prompt, completion) {
            const systemMessage: ChatMessageProps = {
                role: 'system',
                content: completion,
            }

            setMessages(current => [...current, systemMessage])
            setInput('')

            router.refresh()
        },
        onError(error) {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: error.message.includes('429') || error.message.includes('rate limit')
                    ? 'Groq rate limit exceeded. Try again later.'
                    : 'Failed to generate a response.',
            })

            router.refresh()
        },
    })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: 'user',
            content: input,
        }

        setMessages(current => [...current, userMessage])

        handleSubmit(e)
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion} />
            <ChatMessages companion={companion} isLoading={isLoading} messages={messages} />
            <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} onSubmit={onSubmit} />
        </div>
    )
}

export default ChatClient
