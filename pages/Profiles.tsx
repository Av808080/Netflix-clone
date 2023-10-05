import React from 'react'
import { NextPageContext } from 'next/types'
import { getSession } from 'next-auth/react'
import ProfilePage from '@/Components/ProfilePage/ProfilePage'

const Profiles = () => {
    return <ProfilePage />
}

export default Profiles

export async function getServerSideProps(cntx: NextPageContext) {
    const session = await getSession({ req: cntx.req })
    if (!session)
        return {
            redirect: {
                destination: '/auth',
                permamnet: false
            }
        }
    return {
        props: {}
    }
}