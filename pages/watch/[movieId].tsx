import React from 'react'
import { useRouter } from 'next/router'
import useMovieById from '@/hooks/useMovieById'
import { IoMdArrowRoundBack } from 'react-icons/io'
const WatchMovie = () => {
    const { push, query: { movieId } } = useRouter()
    const { data, error, isLoading } = useMovieById(movieId as string)
    if (isLoading)
        return <p className='text-white'>Loading...</p>
    if (error)
        return <p className='text-white text-3xl my-8 text-center mx-auto'>Unfortunately an error occured</p>
    return (
        <div className='relative'>
            <button className='absolute top-4 left-4 z-20' 
            onClick={()=>push('/')}
            >
                <IoMdArrowRoundBack className='text-white' size={24} />

            </button>

            <video src={data?.movie?.videoUrl} poster={data?.movie?.thumbnailUrl}
                controls autoPlay className='w-screen h-screen' />
        </div>
    )
}

export default WatchMovie
