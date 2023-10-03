import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prismadb";

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
        })
      
    ],
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECCRET
    },
    secret:process.env.NEXTAUTH_SECRET
})