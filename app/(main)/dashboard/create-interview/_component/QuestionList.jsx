import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function QuestionList({ formData }) {

    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();

    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])

    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-model', {
                ...formData
            })
            console.log(result.data.content);
            // const Content=JSON.parse(result.data.content);
            const Content = result.data.content;
            const FINAL_CONTENT = Content.replace("```json", "").replace("```", "")

            setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
            // setQuestionList(Content);
            setLoading(false);
        }
        catch (e) {
            toast('Server error, try again')
            setLoading(false);
        }
    }

    return (
        <div>
            {loading &&
                <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
                    <Loader2Icon className='animate-spin' />
                    <div>
                        <h2>Generating interview questions</h2>
                        <p>Our AI is crafting personalized question based on your job position</p>
                    </div>
                </div>
            }

            {questionList?.length > 0 &&
                        <div className='p-5 border-gray-200 rounded-xl'>

                            {questionList.map((item, index)=>(
                                <div key={index} className='p-3 border-gray-100 rounded-xl'>

                                    <h2 className='font-medium'> {item}  </h2>
                                    <h2> Type: {item?.type} </h2>
                                    </div>
                            ))}
                        </div>
                    }

        </div>
    )
}

export default QuestionList