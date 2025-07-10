import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  console.log("Candidate Feedback Dialog Props:", candidate);

  let parsedFeedback = {};

  if (!candidate?.feedback) {
    parsedFeedback = {};
  } else if (typeof candidate.feedback === "string") {
    try {
      parsedFeedback = JSON.parse(candidate.feedback);
    } catch (e) {
      console.error("Failed to parse feedback JSON:", e);
      parsedFeedback = {};
    }
  } else if (typeof candidate.feedback === "object") {
    parsedFeedback = candidate.feedback;
  } else {
    parsedFeedback = {};
  }

  // Now access directly (no .feedback inside)
  const rating = parsedFeedback.rating || {};
  const summary = parsedFeedback?.summary ?? parsedFeedback?.summery ?? "";
  const recommendation = parsedFeedback.recommendationMsg || "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2 className="bg-primary p-3 font-bold text-gray-500 rounded-full">
                    {candidate.userName?.charAt(0).toUpperCase() || "?"}
                  </h2>
                  <div className="text-left">
                    <h2 className="font-bold">
                      {candidate.userName || "Unknown"}
                    </h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <h2 className="text-blue-500 text-2xl font-bold">
                    {rating.communication ?? "N/A"}/10
                  </h2>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Skills Assessment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{rating.technicalSkills ?? "N/A"}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={
                        rating.technicalSkills ? rating.technicalSkills * 10 : 0
                      }
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication{" "}
                      <span>{rating.communication ?? "N/A"}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={
                        rating.communication ? rating.communication * 10 : 0
                      }
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving{" "}
                      <span>{rating.problemSolving ?? "N/A"}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={
                        rating.problemSolving ? rating.problemSolving * 10 : 0
                      }
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience <span>{rating.experience ?? "N/A"}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={rating.experience ? rating.experience * 10 : 0}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Summary</h2>
                <p className="text-sm mt-2">
                  {summary || "No summary provided."}
                </p>
              </div>

              <div
                className={`flex items-center justify-between p-5 gap-5 mt-5 rounded-md ${
                  recommendation === "Accepted" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div>
                  <h2
                    className={`font-bold ${
                      recommendation === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Recommendation Message
                  </h2>
                  <p
                    className={`text-sm mt-2 ${
                      recommendation === "Accepted"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {recommendation || "No recommendation provided."}
                  </p>
                </div>

                <Button
                  className={`text-black bg-white border border-black ${
                    recommendation === "Accepted"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                  onClick={() => {
                    // Placeholder for send response action
                    alert(
                      `Send response for ${candidate.userName || "candidate"}`
                    );
                  }}
                >
                  Send Response
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
