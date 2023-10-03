import React, { ChangeEvent, useState, useCallback } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Input from '../UI/Input'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'


const Auth = () => {
    const { data, status } = useSession()
    console.log({ data, status });
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState<'login' | 'register'>('login')

    const toggleVariant = useCallback(() => {
        setVariant(currentVariant => currentVariant === 'login' ? 'register' : 'login')
    }, [variant])

    const register = async () => {
        try {
            await axios.post('/api/register', {
                email,
                password,
                userName
            })
        } catch (error) {
            console.log(error);
        }
    }

    const login = async () => {
        console.log({ password, email });

        try {
            await signIn('Credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/'
            })
        } catch (error) {
            console.log(error);
        }
    }
    const googleLogin = () => {
        signIn('google', { callbackUrl: '/' })
    }
    const gitHubLogin = async () => {
        await signIn('github', { callbackUrl: '/' })
    }
    return (
        <div className="h-fit min-h-screen bg-[url('/Images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black h-fit min-h-screen md:bg-opacity-50 '>
                <nav className='px-12 py-8 '>
                    <Image className='block mx-auto md:mx-4' src='/Images/logo.png' alt='Logo' width={300} height={180} />
                </nav>
                <section className='flex justify-center items-center py-4'>
                    <div className='bg-zinc-900 bg-opacity-80 px-6 py-6 max-w-md sm:px-16 w-4/5 rounded-md '>
                        <h1 className='text-zinc-50 text-center text-4xl font-semibold mb-6'>
                            {variant === 'login' ? 'Sign in' : 'Register'}</h1>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' && <Input id='userName' label='Username' value={userName}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value) }} />
                            }
                            <Input id='email' type='email' label='Email' value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} />
                            <Input id='password' type='password' label='Password' value={password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
                        </div>
                        <button className='bg-red-600 text-white w-full my-6 py-1.5 rounded-md hover:bg-red-700 transition duration-150'
                            onClick={variant === 'login' ? login : register}
                        >
                            {variant === 'login' ? 'Login' : 'Sign Up'}</button>
                        <div className='flex justify-center items-center gap-4'>
                            <button onClick={googleLogin}
                                className='bg-neutral-50 rounded-full border-none' ><FcGoogle size={40} /></button>
                            <button onClick={gitHubLogin}
                                className='bg-neutral-50 rounded-full border-none' ><FaGithub size={40} /></button>
                        </div>
                        <p className='text-neutral-400 my-4 text-center'>{variant === 'login'
                            ? 'First time using Netflix?  ' : 'Already have an account?  '}
                            <button className='text-white' onClick={toggleVariant}>
                                {variant === 'login' ? 'Create an account' : 'login'}</button></p>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Auth
