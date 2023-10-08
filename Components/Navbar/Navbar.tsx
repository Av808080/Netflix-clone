import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { FiSearch } from 'react-icons/fi'
import { BsBell } from 'react-icons/bs'
import { RiArrowDropDownLine } from 'react-icons/ri'
import MobileLink from './MobileLink'
import useCurrentUser from '@/hooks/useCurrentUser'

const links = [
    'Home', 'Sreies', 'Films',
    'New & Popular', 'MyList',
    'Browse by Languages'
]

const TOP_OFFSET = 66;
const Navbar = () => {
    const [menuDropDownIsOpen, setMenuDropDownIsOpen] = useState(false)
    const [profileDropDownIsOpen, setProfileDropDownIsOpen] = useState(false)
    const [showBackground, setShowBackground] = useState(false)
    const {push} = useRouter()
    const {data:user , isLoading} = useCurrentUser()
    const profileMenueText = user?.currentUser?.name + "'s Profile"   
    useEffect(() => {
        const handleResize = () => {
            if (window.scrollY >= TOP_OFFSET)
                setShowBackground(true)
            else
                setShowBackground(false)
        }
        window.addEventListener('scroll', handleResize)

        return () => {
            window.removeEventListener('scroll', handleResize)
        }

    }, [])
    return (
        <nav className={`fixed top-0 z-10 w-full px-4 py-4 sm:px-8 md:px-12 flex justify-between 
        items-center text-zinc-100 ${showBackground && 'bg-zinc-800 bg-opacity-90'} `}>
            <div className='flex items-center gap-4 sm:gap-8'>
                <Image src='/Images/logo.png' alt='Logo' width={150} height={75}
                    className=' h-5 w-20  sm:h-8 sm:w-36'
                />
                <div className='relative lg:hidden'>
                    <button className='flex items-center'
                        onClick={() => { setMenuDropDownIsOpen(c => !c); setProfileDropDownIsOpen(false) }}>
                        Browse <RiArrowDropDownLine size={25} className={`${menuDropDownIsOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {
                        menuDropDownIsOpen && <ul className='absolute top-8 sm:top-10 w-52
                          bg-black text-center shadow-md shadow-slate-900 px-2 sm:px-4 py-2'>{
                                links.map((link) => <MobileLink onClick={() => { console.log(90) }
                                }>{link}</MobileLink>)
                            }
                        </ul>
                    }
                </div>
                <ul className='hidden lg:flex gap-6 ' >
                    {links.map(link => <li key={link} className='hover:text-zinc-300 duration-100' ><Link href="/"> {link}</Link></li>)}
                </ul>
            </div>
            <div className='flex gap-3 sm:gap-6 items-center'>
                <button>
                    <FiSearch className='text-lg sm:text-2xl' />
                </button>
                <button>
                    <BsBell className='text-lg sm:text-2xl' />
                </button>
                <button className='flex items-center relative'
                    onClick={() => { setProfileDropDownIsOpen(c => !c); setMenuDropDownIsOpen(false) }}
                >
                    <Image src='/Images/default-red.png' alt='avatar' width={35} height={35}
                        className='w-6 h-6 sm:w-10 sm:h-10'
                    />
                    <RiArrowDropDownLine size={25} className={`${profileDropDownIsOpen ? 'rotate-180':'rotate-0'}`} />
                    {profileDropDownIsOpen && <ul className='absolute top-8 sm:top-12 right-2 
                     bg-black text-center shadow-md shadow-slate-900 px-2 sm:px-4 py-2 w-48'>
                        <MobileLink onClick={()=>push('/Profiles')}>{profileMenueText}</MobileLink>
                        <MobileLink onClick={() => signOut()}>Logout</MobileLink>
                    </ul>}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
