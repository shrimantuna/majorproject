import React from "react";
import moment from "moment";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidateList }) {
  return (
    <div className="p-5">
      <h2 className="font-bold text-lg mb-5">
        Candidates: {candidateList?.length || 0}
      </h2>

      {Array.isArray(candidateList) && candidateList.length > 0 ? (
        candidateList.map((candidate, index) => {
          let communicationRating = "N/A";

          try {
            const feedbackObj =
              typeof candidate?.feedback === "string"
                ? JSON.parse(candidate.feedback)
                : candidate.feedback;

            communicationRating = feedbackObj?.rating?.communication ?? "N/A";
          } catch (e) {
            console.warn("Invalid feedback JSON", candidate?.feedback);
          }

          return (
            <div
              key={index}
              className="p-5 flex items-center justify-between bg-green-100 rounded-lg mb-4"
            >
              <div className="flex items-center gap-3">
                <h2 className="bg-primary p-3 font-bold text-gray-500 rounded-full">
                  {candidate.userName?.charAt(0).toUpperCase() || "?"}
                </h2>
                <div className="text-left">
                  <h2 className="font-bold">
                    {candidate.userName || "Unknown"}
                  </h2>
                  <h2 className="text-sm text-gray-500">
                    Completed On:{" "}
                    {candidate.created_at
                      ? moment
                          .utc(candidate.created_at)
                          .local()
                          .format("MMMM Do YYYY")
                      : "N/A"}
                  </h2>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <h2 className="text-blue-500">
                  {communicationRating !== "N/A"
                    ? `${communicationRating}/10`
                    : "N/A"}
                </h2>
                <CandidateFeedbackDialog candidate={candidate} />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500">No candidates available.</p>
      )}
    </div>
  );
}

export default CandidateList;
