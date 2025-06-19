import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@/provider";
import { InterviewType } from "@/services/Constants";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [ saveLoading, setSaveLoading ] = useState(false);

  // console.log("questionList", questionList);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  // const GenerateQuestionList = async () => {

  // }

  const onFinish = async () => {
    setSaveLoading(true);

    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id

        },
      ])
      .select()

    setSaveLoading(false);

    onCreateLink(interview_id)




  }

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      console.log(result.data.content);

      const Content = result.data.content;

      const jsonMatch = Content.match(/{[\s\S]*}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log("Parsed interview questions:", parsed.interviewQuestions);
        console.log("FINAL_CONTENT", parsed);
        setQuestionList(parsed.interviewQuestions || []);
      } else {
        console.warn("Could not find JSON block in the content.");
      }

      // setQuestionList(Content);
      setLoading(false);
    } catch (e) {
      toast("Server error, try again");
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className={"font-medium"}>Generating interview questions</h2>
            <p className={"text-primary"}>
              Our AI is crafting personalized question based on your job
              position
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      <div className={"flex justify-end mt-10"}>
        <Button onClick={() => onFinish()} disabled={saveLoading} >
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>

    </div>
  );
}

export default QuestionList;
