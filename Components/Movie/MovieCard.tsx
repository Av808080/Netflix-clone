import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import useModalInfo from '@/hooks/useInfoModal'
import Modal from '../Modal/Modal'

interface MovieProps {
    movie: Record<string, any>
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {   
    const { showModal , onOpen } = useModalInfo()
    return (
        <article className='group relative'>
            {showModal === movie._id &&<Modal movie={movie}/>}
            <img src={movie.thumbnailUrl || '/Iamges/hero.jpg'} alt='thumbnail'
                className='h-40 w-72 object-cover visible group-hover:invisible
                transition-all rounded-md
                delay-150  duration-200' />
            <div className='flex flex-col absolute z-10 -top-4 invisible group-hover:visible 
            delay-150 duration-200 group-hover:-translate-y-6'>
                <img src={movie.thumbnailUrl} alt=''
                    className='object-cover h-36 w-72
                    rounded-t-md'
                />
                <div className='flex flex-col gap-3 rounded-b-md text-white
                 bg-neutral-700 px-3 py-2'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <button className='bg-white text-black flex justify-center
                            items-center rounded-full w-8 h-8'>
                                <Link href={`/watch/${movie._id} `}>
                                    <FaPlay size={18} />
                                </Link>
                            </button>
                            <button className='bg-transparent flex justify-center items-center
                            rounded-full border-2 border-white w-8 h-8'
                                onClick={() => {
                                    axios.delete('/api/favorite', { data: { movieId: movie._id } })
                                        .then(res => console.log(res.data)).catch(err => console.log(err))
                                }}
                            >
                                <AiOutlinePlus />
                            </button>
                        </div>
                        <button className='flex justify-center items-center w-8 h-8
                        rounded-full border-2 border-white'
                        onClick={()=>onOpen(movie._id)}
                        >
                            <RiArrowDropDownLine size={30}  />
                        </button>
                    </div>
                    <div className='font-bold'><span className='text-green-500'>NEW</span> 2021</div>
                    <div>{movie.duration}</div>
                    <div>{movie.genre}</div>
                </div>
            </div>
        </article>
    )
}

export default MovieCard
