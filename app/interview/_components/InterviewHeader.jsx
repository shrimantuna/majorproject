'use client';

import Image from 'next/image'
import React from 'react'

function InterviewHeader() {

  return (
    <div className='p-4 shadow-sm'>
        <Image src={'/logo.png'} alt='logo' width={100} height={60}
        className='w-[100px]' 
        />
    </div>
  )
}

export default InterviewHeader