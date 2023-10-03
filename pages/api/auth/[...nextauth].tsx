import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from 'bcryptjs'

export default NextAuth({
    providers: [
        Credentials({
            id: 'Credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'text'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error('Email and password required')
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user.hashedPassword)
                    throw new Error('No User Found')
                const passwordIsVaild = await compare
                    (credentials.password, user.hashedPassword)
                if (!passwordIsVaild)
                    throw new Error('Password is incorrect')
                return user
            }
        }),
        GitHubProvider({
            clientId: String(process.env.GITHUB_ID!),
            clientSecret: String(process.env.GITHUB_SECRET!),
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    // jwt: {
    //     secret: process.env.NEXTAUTH_JWT_SECCRET
    // },
    secret: process.env.NEXTAUTH_SECRET
})