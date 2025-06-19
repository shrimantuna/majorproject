"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { useRouter } from 'next/navigation';
import QuestionList from '@/app/(main)/dashboard/create-interview/_component/QuestionList';


function Interview() {
    const { interview_id } = useParams();
    console.log(interview_id)
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loading, setLoading] = useState(false);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,duration,type")
                .eq('interview_id', interview_id)

            setInterviewData(Interviews[0]);
            setLoading(false);

            if (Interviews?.length == 0) {
                toast('incorrect interview link')
                return;
            }
        } catch (e) {
            setLoading(false);
            toast('incorrect interview link')

        }
    }
    const onJoinInterview = async () => {
        setLoading(true);

        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id)

        console.log(Interviews[0]);
        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            interviewData: Interview[0]

        });
        router.push('/interview/' + interview_id + '/start/')
        setLoading(false);


    }
    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-20'>

            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-8 lg:px-33 xl:px-52 mb-20'>
                <Image src={'/logo.png'} alt='logo' width={200} height={200}
                    className='w-[140px]'
                />
                <h2 className='mt-4'> AI powered interview platform</h2>
                <Image src={'/interview.png'} alt='interview'
                    width={500}
                    height={500}
                    className='w-[280px] my-6'
                />

                <h2 className='font-bold text-xl mt-3'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-400 mt-4'> <Clock className='h-4 w-4' /> {interviewData?.duration} </h2>
                <div className='w-full'>
                    <h2 className='font-medium'> Enter your full name</h2>
                    <Input placeholder='eg: jhon@gmail.com' className='mt-2' onChange={(event) => setUserName(event.target.value)} />
                </div>

                 <div className='w-full'>
                    <h2 className='font-medium'> Enter your Email</h2>
                    <Input placeholder='eg: jhon doe' className='mt-2' onChange={(event) => setUserEmail(event.target.value)} />
                </div>

                <div className='p-3 bg-blue-100 flex gap-4 rounded-xl mt-10'>
                    <Info className=' text-blue-900' />
                    <div>
                        <h2 className='font-bold  text-blue-900 mb-2'> Before you begin</h2>
                        <ul>
                            <li className='text-sm  text-blue-900'> - Test your camera and microphone</li>
                            <li className='text-sm  text-blue-900'> - Ensure you have a stable internet connection</li>
                            <li className='text-sm  text-blue-900'> - Find a quiet place for interview</li>
                        </ul>
                    </div>
                </div>

                <Button className={'mt-5 w-full font-bold'}
                    disabled={loading || !userName}
                    onClick={() => onJoinInterview()}
                >
                    <Video /> {loading && <Loader2Icon />} Join interview</Button>
            </div>

        </div>
    )
}

export default Interview