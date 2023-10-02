import React, { ChangeEvent } from 'react'

interface InputProps {
    id: string
    label: string
    value: string
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
    type?: string
}

const Input: React.FC<InputProps> = ({
    id, label, onChange, value, type = 'text'
}) => {
    return (
        <div
            className='relative'>
            <input
                id={id}
                type={type}
                onChange={onChange}
                value={value}
                className='
                      block rounded-md px-6 pt-4 pb-1 w-full text-base
                      text-white bg-neutral-700 appearance-none
                      focus:border-none focus:ring-0 peer
                      '
                placeholder=''
            />
            <label htmlFor={id}
                className='
                    absolute text-base text-zinc-400
                    duration-150 transform
                    -translate-y-4 scale-75 top-4
                    z-10 origin-[0] left-6 
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    '
            >
                {label}
            </label>
        </div>
    )
}

export default Input
