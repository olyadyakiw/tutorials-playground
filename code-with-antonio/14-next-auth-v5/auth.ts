import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'
import { UserRole } from '@prisma/client'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { getAccountByUserId } from './data/account'

export const {
    handlers: { GET, POST },
    auth,
    signOut,
    signIn,
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id)

            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                })
            }

            return true
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.isOAuth = token.isOAuth as boolean
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const exisitingUser = await getUserById(token.sub)

            if (!exisitingUser) return token

            const exisitingAccount = await getAccountByUserId(exisitingUser.id)

            token.isOAuth = !!exisitingAccount
            token.name = exisitingUser.name
            token.email = exisitingUser.email
            token.role = exisitingUser.role
            token.isTwoFactorEnabled = exisitingUser.isTwoFactorEnabled

            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
