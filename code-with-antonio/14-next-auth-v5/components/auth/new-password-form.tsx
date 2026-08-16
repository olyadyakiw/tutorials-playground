'use client'

import CardWrapper from './card-wrapper'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import * as z from 'zod'
import { NewPassowrdSchema } from '@/schemas'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useState, useTransition } from 'react'
import { newPassword } from '@/actions/new-password'

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const form = useForm<z.infer<typeof NewPassowrdSchema>>({
        resolver: zodResolver(NewPassowrdSchema),
        defaultValues: {
            password: '',
        },
    })

    const onSubmit = (values: z.infer<typeof NewPassowrdSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            newPassword(values, token).then(data => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper headerLabel="Enter a new password?" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="******" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
