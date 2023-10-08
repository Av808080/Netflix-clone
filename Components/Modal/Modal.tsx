import React from 'react'
import { useRouter } from 'next/router'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaPlay, FaTimesCircle } from 'react-icons/fa'
import { LiaTimesSolid } from 'react-icons/lia'
import useModalInfo from '@/hooks/useInfoModal'

interface ModalContent {
    movie: Record<string, any>
}
const Modal: React.FC<ModalContent> = ({ movie }) => {
    const { onClose } = useModalInfo()
    const { push } = useRouter()
    return (
        <div className='w-screen h-screen fixed top-0 left-0 z-30
           bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='relative w-[450px] h-fit max-h-[450px]
            text-neutral-50 bg-neutral-800 rounded-md m-4'>
                <div className='h-52 relative'>
                    <video src={movie.videoUrl}
                        autoPlay loop muted
                        className='h-52 w-[450px]
                        object-cover rounded-t-md'
                    />
                    <button className='absolute top-2 right-2'
                        onClick={onClose}
                        title='Close Modal'>
                        <LiaTimesSolid size={20} /> </button>
                    <div className='absolute z-50 bottom-3 left-1
                         mx-3 flex flex-col gap-2 '>
                        <h3 className='font-bold text-xl'>{movie.title}</h3>
                        <div className='flex gap-3'>
                            <button className='flex gap-1 items-center
                             bg-neutral-50 rounded-md text-black px-2 py-0.5'
                                onClick={() => push(`/watch/${movie._id} `)}
                                title='Watch this Movie'>
                                <FaPlay size={15} /> Play</button>
                            <button className='flex justify-center items-center border-2
                             border-neutral-50 rounded-full w-7 h-7' title='Add to favotites' >
                                <AiOutlinePlus /></button>
                        </div>
                    </div>
                </div>
                <div className='px-4 py-2 flex flex-col justify-center gap-0.5 '>
                    <p className='text-green-500 font-semibold italic'> New 2021</p>
                    <p>{movie.duration}</p>
                    <p>{movie.genre}</p>
                    <p className='text-justify'>{movie.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal
