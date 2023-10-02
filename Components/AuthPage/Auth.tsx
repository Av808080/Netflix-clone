import React, { ChangeEvent, useState, useCallback } from 'react'
import Image from 'next/image'
import Input from '../UI/Input'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState<'login' | 'register'>('login')
    const toggleVariant = useCallback(() => {
        setVariant(currentVariant => currentVariant === 'login' ? 'register' : 'login')
    }, [variant])
    return (
        <div className="h-full bg-[url('/Images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black h-full md:bg-opacity-50 '>
                <nav className='px-12 py-8 '>
                    <Image className='block mx-auto md:mx-4' src='/Images/logo.png' alt='Logo' width={300} height={180} />
                </nav>
                <section className='flex justify-center items-center'>
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
                        <button className='bg-red-600 text-white w-full my-6 py-1.5 rounded-md hover:bg-red-700 transition duration-150' >
                            {variant === 'login' ? 'Login' : 'Sign Up'}</button>
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
