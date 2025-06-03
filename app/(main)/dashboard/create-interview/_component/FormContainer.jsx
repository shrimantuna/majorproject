import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'


function FormContainer({ onHandleInputChange, GoToNext }) {

    const [interviewType, setInterviewType] = useState([]);

    useEffect(() => {
        if (interviewType) {
            onHandleInputChange('type', interviewType)
        }

    }, [interviewType]);

    const AddInterviewtype=(type)=>{
        const data=interviewType.includes(type);
        if(!data)
        {
            setInterviewType(prev => [...prev, type])
        } else{
            const result=interviewType.filter(item=>item!=type);
            setInterviewType(result);
        }
    }

    return (
        <div className='p-5 bg-white rounded-xl'>
            <div>
                <h2 className='text-sm font-medium'>
                    Job position </h2>
                <Input placeholder="eg Fullstack developer" className='mt-2'
                    onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
                />
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>
                    Job description </h2>
                <Textarea placeholder='Enter details foe job description' className='h-[200px] mt-2'
                    onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
                />
            </div>


            <div className='mt-5'>
                <h2 className='text-sm font-medium'>
                    Interview Duration </h2>
                <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 mins"> 5 mins </SelectItem>
                        <SelectItem value="15 mins"> 15 mins </SelectItem>
                        <SelectItem value="30 mins">30 mins </SelectItem>
                        <SelectItem value="45 mins">45 mins</SelectItem>
                        <SelectItem value="60 mins"> 60 mins</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className={"mt-5"}>
                <h2 className={"text-sm font-medium"}>Interview Type</h2>
                <div className={"flex gap-3 flex-wrap mt-2"}>
                    {InterviewType.map((type, index) => (
                        <div key={index} 
                        className={`flex items-center cursor-pointer gap-2 p-1 px-4 text-black hover:bg-secondary border border-gray-300 rounded-2xl 
                            ${interviewType.includes(type.title)&&'bg-blue-100 text-primary'}`}
                            onClick={() => AddInterviewtype(type.title)}
                            // onClick={() => setInterviewType(prev => [...prev, type.title])}
                        >
                            <type.icon className={"h-4 w-4"} />
                            <span>{type.title}</span>
                        </div>

                    ))}
                </div>
            </div>

            <div className="mt-10 flex justify-end" onClick={()=>GoToNext()}>
                <Button>
                    Generate Question <ArrowRight />
                </Button>
            </div>

        </div>

    )
}

export default FormContainer