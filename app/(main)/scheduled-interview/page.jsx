"use client"
import { useUser } from '@/provider';
import { supabase } from '@/services/supabaseClient'
import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/create-interview/_component/InterviewCard';
import { Button } from '@/components/ui/button';

function ScheduledInterview() {

    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();

    useEffect(() => {

        user && GetInterviewList();

    }, [user])

    const GetInterviewList = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,duration,interview_id,interview-feedback(useEmail)')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })

        console.log(result);
        setInterviewList(result.data);
    }

    return (
        <div className='mt-5'>

            <h2 className='font-bold text-xl mb-6'> Interview List with Candidate Feedback</h2>

            {/* {interviewList?.length == 0 &&
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
            } */}

            {Array.isArray(interviewList) && interviewList.length === 0 && (
                <div className='p-5 flex flex-col gap-3 items-center bg-white mt-8 rounded-2xl py-16'>
                    <Camera className='h-10 w-10 text-primary' />
                    <h2 className='mb-2'>You do not have any interview created</h2>
                    <Button>Create new interview</Button>
                </div>
            )}

            {Array.isArray(interviewList) && interviewList.length > 0 && (
                <div className='grid grid-cols-2 xl:grid-cols-4 gap-5'>
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} viewDetail={true} />
                    ))}
                </div>
            )}

<<<<<<< HEAD
            {/* changes */}

=======
>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d

        </div>
    )
}

export default ScheduledInterview