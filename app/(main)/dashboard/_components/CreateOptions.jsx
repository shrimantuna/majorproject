import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
    return (
        <div className={"grid grid-cols-2 gap-5 mt-6"}>
            <Link href={'/dashboard/create-interview'} className={"bg-white border border-gray-200 rounded-lg p-5 cursor-pointer"}>
                <Video className={"p-3 text-primary bg-blue-50 rounded-lg h-13 w-13"} />
                <h2 className={'font-bold mt-5'}>Create New Interview</h2>
                <p className={'text-gray-500 text-sm'}>Create Interviews and Schedule them with Candidates</p>
            </Link>

            <div className={"bg-white border border-gray-200 rounded-lg p-5"}>
                <Phone className={"p-3 text-primary bg-blue-50 rounded-lg h-13 w-13"} />
                <h2 className={'font-bold mt-5'}>Create Phone Screen Calls</h2>
                <p className={'text-gray-500 text-sm'}>Schedule Phone Screen Calls with Candidates</p>
            </div>

        </div>
    )
}

export default CreateOptions