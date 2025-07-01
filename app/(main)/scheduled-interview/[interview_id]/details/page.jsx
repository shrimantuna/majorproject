"use client"
import { useUser } from '@/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React from 'react'

function InterviewDetail() {

    const { interview_id } = useParams();
    const { user } = useUser();

     useEffect(() => {
    
            user && GetInterviewList();
    
        }, [user])

    const GetInterviewDetail = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,duration,interview_id,interview-feedback(useEmail)')
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)

        console.log(result);


        return (
            <div>

                <div>
                    page
                </div>

            </div>
        )
    }
}

    export default InterviewDetail