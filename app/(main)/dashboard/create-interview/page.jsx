"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_component/FormContainer";
import QuestionList from "./_component/QuestionList";
import { toast } from "sonner";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("FormData", formData);
  };
  const onGoToNext = () => {
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      // (formData?.length<=3)
      toast("Please enter all details!");
      return;
    }
    setStep(step + 1);
  };
  return (
    <div className="mt-12 px-10 md:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create new interview</h2>
      </div>

      <Progress value={step * 33.33} className="my-5" />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GoToNext={() => onGoToNext()}
          // setStep(step + 1)}
        />
      ) : step == 2 ? (
        <QuestionList formData={formData} />
      ) : null}
    </div>
  );
}

export default CreateInterview;
