import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  const onSend = () => {
    window.location.href = `mailto:maharjan.shrimantuna@gmail.com?subject=AIREC interview link&body=Interview Link: ${url}`;
  };

  return (
    <div className="p-5 bg-white rounded-lg border w-auto">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full" />
        <h2 className="text-sm text-gray-600">
          {interview?.created_at
            ? moment(interview.created_at).format("DD-MM-YYYY")
            : "Date not available"}
        </h2>
      </div>

      <h2 className="text-black font-bold mt-3 text-lg">
        {interview?.jobPosition || "Unknown Position"}
      </h2>

      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.duration || "N/A"}
        <span className="text-green-800">
          {interview["interview-feedback"]?.length || 0} Candidates
        </span>
      </h2>

      {!viewDetail ? (
        <div className="flex gap-3 mt-5 items-center">
          <Button variant="outline" className="w-31" onClick={copyLink}>
            <Copy className="mr-1 h-4 w-4" /> Copy link
          </Button>
          <Button onClick={onSend} className="w-31">
            <Send className="mr-1 h-4 w-4" /> Send
          </Button>
        </div>
      ) : (
        <Link href={`/scheduled-interview/${interview.id}/details`}>
          <Button className="mt-5 w-full" variant="outline">
            <ArrowRight className="mr-1 h-4 w-4" /> View Detail
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
