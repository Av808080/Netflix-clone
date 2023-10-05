import React from 'react'
import Image from 'next/image'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/router'
const ProfilePage = () => {
    const { data: user } = useCurrentUser()
    const { push } = useRouter()
    return (
        <section className='min-h-screen flex justify-center
         items-center flex-col gap-6 md:gap-9 text-zinc-50 '>
            <p className='text-3xl md:text-5xl font-bold tracking-wider'>
                Who is Watching?</p>
            <div className='cursor-pointer'
                onClick={() => push('/')}
            >
                <Image src={user?.currentUser?.image || '/Images/default-red.png'}
                    alt='Profile Image' width={180} height={180}
                    className='hover:border-4 border-rose-600 duration-150'
                />
            </div>
            <p className='text-2xl md:text-3xl font-semibold tracking-wide'>
                Welcome {user?.currentUser?.name}
            </p>
        </section>
    )
}

export default ProfilePage
