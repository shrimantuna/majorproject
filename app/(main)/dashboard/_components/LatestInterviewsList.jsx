"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@/provider';
import { supabase } from '@/services/supabaseClient';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../create-interview/_component/InterviewCard';
import { toast } from 'sonner';

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const handleClick = () => {
        router.push('/dashboard/create-interview');
    };

    useEffect(() => {

        user && GetInterviewList();

    }, [user])

    const GetInterviewList = async () => {

        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })
            .limit(6);

        console.log(Interviews);
        setInterviewList(Interviews);

    }


    return (
        <div className='my- 5 mt-10'>
            <h2 className='text-black-500 font-bold text-xl mb-6'>
                Previously created interviews
            </h2>

            {interviewList?.length == 0 &&
                <div className='p-5 flex flex-col gap-3 items-center bg-white mt-8 rounded-2xl py-16'>
                    <Camera className='h-10 w-10 text-primary' />
                    <h2 className='mb-2'>
                        You do not have any interview created
                    </h2>
                    <Button onClick={handleClick} >Create new interview</Button>

                </div>
            }


            {interviewList &&
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>

                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} />
                    ))}


                </div>
            }
        </div>
    )
}

export default LatestInterviewsList