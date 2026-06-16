import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className={cn('font-sans', inter.className)}>
                <body className={inter.className}>
                    <ToasterProvider />
                    <ModalProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
