import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prismadb'
import { hash } from 'bcryptjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST')
        return res.status(405).json({ message: "Method Not Support", ok: false })
    const { email, userName, password } = req.body
    if (!email)
        return res.status(422).json({ message: "Email is required", ok: false })
    if (!password)
        return res.status(422).json({ message: "Password is required", ok: false })
    if (!userName)
        return res.status(422).json({ message: "Username is required", ok: false })
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email))
        return res.status(422).json({ message: "Invalid Email", ok: false })
    if (password.length < 8)
        return res.status(422).json({ message: "Password sould be at least 8 chars", ok: false })
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user)
            return res.status(409).json({ message: "User has already Created", ok: false })
        const hashedPassword = await hash(password, 12)
        await prisma.user.create({
            data: {
                name: userName,
                email,
                hashedPassword
            }
        })
        res.status(201).json({ message: "User created succussfully", ok: true })
    } catch (error) {
        res.status(501).json({ messgae: "Creted user failed ", ok: false })
        console.log(error);
    }
}
export default handler