import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
  console.log("interview", interview);

  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  const onSend = () => {
    window.location.href =
      "mailto:maharjan.shrimantuna@gmail.com?subject:AIREC interview link & body= Interview Link:" +
      url;
  };

  return (
    <div className="p-5 bh-white rounded-lg border w-auto">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>

        <h2 className="text-sm">
          {moment(interview?.created_at).format("DD MM YYYY")}
        </h2>
      </div>

      <h2 className={"text-black font-bold mt-3 text-lg"}>
        {interview?.jobPosition}
      </h2>
      <h2 className={"mt-2 flex justify-between text-gray-500"}>
        {interview?.duration}
        <span className={"text-green-800"}>
          {interview["interview-feedback"]?.length}Candidates
        </span>
      </h2>

      {!viewDetail ? (
        <div className="flex gap-3 mt-5 content-center">
          <Button
            variant={"outline"}
            className={"w-31"}
            onClick={() => copyLink(url)}
          >
            {" "}
            <Copy /> Copy link
          </Button>
          <Button onClick={onSend} className={"w-31"}>
            {" "}
            <Send /> Send{" "}
          </Button>
        </div>
      ) : (
        <Link href={"/scheduled-interview/" + interview_id + "/detail"}>
          <Button className={"mt-5 w-full"} variant="outline">
            {" "}
            <ArrowRight /> View Detail{" "}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
