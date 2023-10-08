import React from 'react'
import Image from 'next/image'
import useBillboard from '@/hooks/useBillboard';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import useModalInfo from '@/hooks/useInfoModal';

const Billboard = () => {
    const { data, isLoading, error } = useBillboard()
    const { onOpen } = useModalInfo()
    if (isLoading || !data)
        return <p className='text-zinc-100'>loading...</p>
    return (
        <section className='text-white relative'>
            <video className='z-10 w-screen object-cover object-center min-h-screen'
                muted autoPlay loop
                // poster={data.movie.thumbnailUrl}
                src={data.movie.videoUrl} />
            <div className='absolute top-[20%] left-[5%] right-[15%] sm:right-[25%] 
                    md:right-[40%] lg:right-[50%] max-h-screen
                    flex flex-col items-start gap-4 lg:gap-8 p-1 overflow-hidden' >
                <h3 className='text-3xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl'>{data.movie.title}</h3>
                <p className='font-semibold text-md sm:text-xl lg:text-2xl xl:text-3xl'>{data.movie.description}</p>
                <button className='bg-zinc-500 bg-opacity-60 px-4 py-1 lg:px-6 lg:py-1.5 rounded-md flex 
                    items-center gap-2 '
                    onClick={() => {onOpen(data.movie.id) }}
                >
                    <HiOutlineExclamationCircle size={15} /> More Info</button>
            </div>
        </section>

    )
}

export default Billboard
