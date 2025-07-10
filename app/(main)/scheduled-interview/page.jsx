"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/provider";
import { supabase } from "@/services/supabaseClient";
import { Camera } from "lucide-react";
import InterviewCard from "../dashboard/create-interview/_component/InterviewCard";
import { Button } from "@/components/ui/button";

function ScheduledInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(
        `
        id,
        jobPosition,
        duration,
        created_at,
        interview-feedback(id)
      `
      )
      .eq("userEmail", user.email)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interviews:", error.message);
      setInterviewList([]);
      return;
    }

    console.log("Fetched interviews:", data);
    setInterviewList(data || []);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl mb-6">
        Interview List with Candidate Feedback
      </h2>

      {Array.isArray(interviewList) && interviewList.length === 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-white mt-8 rounded-2xl py-16">
          <Camera className="h-10 w-10 text-primary" />
          <h2 className="mb-2">You do not have any interview created</h2>
          <Button>Create new interview</Button>
        </div>
      )}

      {Array.isArray(interviewList) && interviewList.length > 0 && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
          {interviewList.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
