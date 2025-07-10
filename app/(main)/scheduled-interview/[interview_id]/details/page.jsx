"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/provider";
import InterviewDetailContainer from "../_components/InterviewDetailContainer";
import CandidateList from "../_components/CandidateList";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();

  const [interviewDetail, setInterviewDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && interview_id) {
      fetchInterviewDetail();
    }
  }, [user, interview_id]);

  const fetchInterviewDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("Interviews")
        .select(
          `
          jobPosition,
          jobDescription,
          type,
          questionList,
          duration,
          id,
          created_at,
          interview-feedback (
            userEmail,
            userName,
            feedback,
            created_at
          )
        `
        )
        .eq("id", interview_id) // primary key column name
        .single();

      if (error) throw error;

      setInterviewDetail(data);
    } catch (err) {
      setError(err.message || "Failed to load interview details");
      setInterviewDetail(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="mt-10">Loading interview details...</div>;
  if (error) return <div className="mt-10 text-red-600">Error: {error}</div>;
  if (!interviewDetail) return <div className="mt-10">No interview found.</div>;

  return (
    <div className="mt-15">
      <h2 className="font-bold text-2xl mb-6">Interview Detail</h2>

      <InterviewDetailContainer interviewDetail={interviewDetail} />

      <CandidateList
        candidateList={interviewDetail["interview-feedback"] || []}
      />
    </div>
  );
}

export default InterviewDetail;
