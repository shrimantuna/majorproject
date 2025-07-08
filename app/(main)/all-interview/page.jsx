"use client"
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/create-interview/_component/InterviewCard';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/provider';


function AllInterview() {
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();

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
                All Previously created interviews
            </h2>

            {interviewList?.length == 0 &&
                <div className='p-5 flex flex-col gap-3 items-center bg-white mt-8 rounded-2xl py-16'>
                    <Camera className='h-10 w-10 text-primary' />
                    <h2 className='mb-2'>
                        You do not have any interview created
                    </h2>
                    <Button>Create new interview</Button>

                </div>
            }


            {interviewList &&
                <div className='grid grid-cols-2 xl:grid-cols-4 gap-5'>

                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} />
                    ))}


                </div>
            }
        </div>
    )
}
export default AllInterview