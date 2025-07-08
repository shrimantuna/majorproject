<<<<<<< HEAD
"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { Content } from "openai/resources/containers/files/content";
=======
"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { Content } from 'openai/resources/containers/files/content';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { useTimer } from 'react-timer-hook';

>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  console.log("interviewInfo", interviewInfo);

  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
<<<<<<< HEAD
=======
  const { interview_id } = useParams();
  const route = useRouter();
  const [loading, setLoading] = useState();
  const [callEnd, setCallEnd] = useState(false);


  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item, index) => {
      questionList = item?.question + "," + questionList;
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
  You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ` +
              questionList +
              `
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };

<<<<<<< HEAD
    vapi.start(assistantOptions);
  };
  const stopInterview = () => {
    vapi.stop();
  };
=======
    vapi.start(assistantOptions)

  }

  const stopInterview = async() => {
    vapi.stop();
    console.log("STOP...")
    setCallEnd(true);
    await GenerateFeedback();
  }
>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d

  vapi.on("call-start", () => {
    console.log("Call has started");
    toast("Call Connected... ");
  });

  vapi.on("speech-start", () => {
    console.log("Assistant speech has started");
    setActiveUser(false);
  });

  vapi.on("speech-end", () => {
    console.log("Assistant speech has ended");
    setActiveUser(true);
  });

  vapi.on("call-end", () => {
    console.log("Call has has ended");
    toast("Interview has ended");
    GenerateFeedback();
  });

<<<<<<< HEAD
  vapi.on("message", (message) => {
    console.log("message", message);

    console.log("messages", message?.conversation);
    setConversation(message?.conversation);
  });

  const GenerateFeedback = async () => {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });

    console.log(result?.data);
    const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
  };
=======
  // vapi.on("message", (message) => {
  //   console.log(message?.conversation);
  //   setConversation(message?.conversation);
  // });


  useEffect(() => {
    const handleMessage = (message) => {
      console.log('Message:', message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log('Conversation String:', convoString);
        setConversation(convoString);
      }
    };

    vapi.on("message", handleMessage);

    vapi.on("call-start", () => {
      console.log("Call has started");
      toast('Call Connected... ')
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended");
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("Call has has ended");
      toast('Interview has ended');
      GenerateFeedback();
    });

    // cleanup the listener
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start"), () => console.log("END");
      vapi.off("speech-start"), () => console.log("END");
      vapi.off("speech-end"), () => console.log("END");
      vapi.off("call-end"), () => console.log("END");

    };
  }, []);




  const GenerateFeedback = async () => {
    setLoading(true);
    console.log("conversation", conversation)

    if (!conversation) {
      return;
    }

    const result = await axios.post('/api/ai-feedback', {
      conversation: conversation
    });

    console.log(result?.data);
    const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
    console.log(FINAL_CONTENT);
    // Save to our database


    const { data, error } = await supabase
      .from('interview-feedback')
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommended: false
        },
      ])
      .select()
    console.log(data)
    route.replace('/interview/' + interview_id + '/completed/');
    // route.push(`/interview/${interview_id}/completed`);

    setLoading(false);



  }
>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        {" "}
        AI interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {/* 00:00:00 */}
          <div className='font-medium'>
            <span>{String(hours).padStart(2, '0')}</span>:
            <span>{String(minutes).padStart(2, '0')}</span>:
            <span>{String(seconds).padStart(2, '0')}</span>
          </div>
        </span>
      </h2>

<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-8 rounded-full bg-blue-100 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.png"}
              alt="ai"
=======
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className='relative'>
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image src={'/ai.png'} alt='ai'
>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>

          <h2> AI Recruiter </h2>
        </div>
<<<<<<< HEAD
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-8 rounded-full bg-blue-100 opacity-75 animate-ping" />
            )}
=======
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className='relative'>

            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}

            <h2 className='text-2xl bg-primary text-white  rounded-full flex items-center justify-center px-5.5 py-3'>
>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d

            <h2 className="text-2xl bg-primary text-white  rounded-full flex items-center justify-center px-5.5 py-3">
              {interviewInfo?.userName[0]}
            </h2>
          </div>
          <h2> {interviewInfo?.userName} </h2>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex items-center gap-6 justify-center mt-8">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
=======
      <div className='flex items-center gap-6 justify-center mt-8'>
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
        {/* <AlertConfirmation stopInterview={() => stopInterview()}> */}
        {/* the video comments this alertconfirm tag */}

        {
          !loading
            ? (
              <Phone
                className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer"
                onClick={() => stopInterview()}
              />
            )
            : (
              <Loader2Icon className='animate-spin' />
            )
        }

        {/* </AlertConfirmation > */}

>>>>>>> 321d49f88fdb2b5f902ae0c6201014674429647d
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        {" "}
        Interview is in progress...
      </h2>
    </div>
  );
}

export default StartInterview;
