"use client"
import { useUser } from '@/provider'
import React from 'react'

function WelcomeContainer() {
    const { user } = useUser();
    return (
        <div>
            <div className='bg-white p-3 rounded-xl'>

                <h2 className='textlg font-bold'>
                    Welcome back, {user?.name}
                </h2>

                <h2 className='text-secondary'>
                    AI-Driven Interviews, hassel free hiring
                </h2>

            </div>
            
            <Image src={user?.picture} alt='userAvatar' width={50} height={50} />

        </div>
    )
}

export default WelcomeContainer