"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const conversationRef = useRef(null); // Added ref for immediate conversation access

  const { interview_id } = useParams();
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const callStartedRef = useRef(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const intervalRef = useRef(null); // Added ref for interval management

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const vapi = vapiRef.current;

    const handleMessage = (message) => {
      console.log("Message:", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("Conversation String:", convoString);
        setConversation(convoString);
        conversationRef.current = convoString; // Store in ref for immediate access
      }
    };

    vapi.on("call-start", () => {
      console.log("Call has started");
      toast("Call Connected... ");
      setSecondsElapsed(0);

      intervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
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
      console.log("Call has ended");
      toast("Interview has ended");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      callStartedRef.current = false;

      // Use the ref value for immediate access
      const finalConversation = conversationRef.current || conversation;
      if (finalConversation) {
        GenerateFeedback(finalConversation);
      } else {
        toast("No conversation data available for feedback.");
        setLoading(false);
      }
    });

    vapi.on("message", handleMessage);

    return () => {
      vapi.off("message", handleMessage);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (interviewInfo && !callStartedRef.current) {
      callStartedRef.current = true;
      startCall();
    }
  }, [interviewInfo]);

  const startCall = async () => {
    const vapi = vapiRef.current;
    let questionList = "";

    (interviewInfo?.interviewData?.questionList || []).forEach((item) => {
      questionList += item?.question + ", ";
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
              ` interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ` +
              questionList +
              `
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };

    try {
      await vapi.start(assistantOptions);
    } catch (err) {
      console.error("Vapi start error:", err);
      toast("Error starting interview");
    }
  };

  const stopInterview = async () => {
    if (!vapiRef.current) return;

    try {
      toast("Stopping interview...");

      // Stop the call
      await vapiRef.current.stop();

      // Wait a moment for any final conversation updates
      setTimeout(() => {
        // Use the most recent conversation data

        // const finalConversation = conversationRef.current || conversation;
        const finalConversation = `
        {
          "conversation": [
            {
              "role": "assistant",
              "content": "Welcome! Let's start the React interview."
            },
            {
              "role": "user",
              "content": "Sure, I'm ready."
            },
            {
              "role": "assistant",
              "content": "What is the difference between useEffect and useLayoutEffect?"
            },
            {
              "role": "user",
              "content": "useEffect runs after paint, and useLayoutEffect before paint."
            }
          ]
        }
        `;

        if (finalConversation) {
          GenerateFeedback(finalConversation);
        } else {
          toast("No conversation data available for feedback.");
          setLoading(false);
        }
      }, 1000); // Wait 1 second for final updates
    } catch (error) {
      console.error("Error stopping interview:", error);
      toast("Error stopping interview");
    }
  };

  const GenerateFeedback = async (conversationData = null) => {
    console.log("feedback function called...");

    setLoading(true);

    const conversationToUse = conversationData || conversation;

    if (!conversationToUse) {
      toast("Conversation data is not available. Please try again.");
      setLoading(false);
      return;
    }

    console.log("calling api with conversation:", conversationToUse);

    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversationToUse,
      });

      console.log("AI Feedback Result:", result);

      // Check if the API returned an error
      if (result.data?.error) {
        toast(`Error: ${result.data.error}`);
        setLoading(false);
        return;
      }

      const rawContent = result.data?.content;
      if (!rawContent) {
        toast("No feedback content found.");
        setLoading(false);
        return;
      }

      // Remove ```json and ``` wrapper
      const cleaned = rawContent
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        console.error("Failed to parse AI feedback:", err);
        toast("Could not parse AI feedback.");
        setLoading(false);
        return;
      }

      const feedbackData = parsed.feedback;

      // Save to database
      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: feedbackData,
            recommended: false,
          },
        ])
        .select();

      if (error) {
        console.error("Database error:", error);
        toast("Error saving feedback to database.");
        setLoading(false);
        return;
      }

      console.log("Feedback saved:", data);
      route.replace("/interview/" + interview_id + "/completed/");
    } catch (error) {
      console.error("Feedback generation error:", error);
      toast("Error generating feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {formatTime(secondsElapsed)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>

          <h2> AI Recruiter </h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}

            <h2 className="text-2xl bg-primary text-white rounded-full flex items-center justify-center px-5.5 py-3">
              {interviewInfo?.userName?.[0] || "U"}
            </h2>
          </div>
          <h2> {interviewInfo?.userName} </h2>
        </div>
      </div>

      <div className="flex items-center gap-6 justify-center mt-8">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        {!loading ? (
          <Phone
            onClick={stopInterview}
            className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer"
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        {loading ? "Generating feedback..." : "Interview is in progress..."}
      </h2>
    </div>
  );
}

export default StartInterview;