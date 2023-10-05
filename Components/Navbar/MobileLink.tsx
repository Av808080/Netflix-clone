import React from 'react'

const MobileLink = ({ children, onClick = () => { } }: { onClick?: any, children: string }) => {
    return (
        <li className='bg-blue-400- text-blue-50 w-full '
            onClick={onClick}
        >
            {children}
        </li>
    )
}

export default MobileLink
