"use client"
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function LatestInterviewsList() {
    const [interviewList, setInterviewList]=useState([]);
    const router = useRouter();

    const handleClick = () => {
        router.push('/dashboard/create-interview');
    };
  return (
    <div className='my- 5 mt-10'>
        <h2 className='text-black-500 font-bold text-xl'>
            Previously created interviews
        </h2>

        {interviewList?.length==0&&
         <div className='p-5 flex flex-col gap-3 items-center bg-white mt-8 rounded-2xl py-16'>
            <Camera className='h-10 w-10 text-primary'/>
            <h2 className='mb-2'>
                You do not have any interview created
            </h2>
            <Button onClick={handleClick} >Create new interview</Button>

        </div>
        }
        </div>
  )
}

export default LatestInterviewsList