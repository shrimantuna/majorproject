import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  ShieldCheck,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },

  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },

  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: ShieldCheck,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📌 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration.
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:"",
  type:'Technical/Behavioral/Experience/Problem Solving/Leaseship'
},{
  ...
}
]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;

export const FEEDBACK_PROMPT = `
You are a skilled AI interviewer assistant.

Below is a recorded interview conversation between the assistant and the user:
{{conversation}}

Based on this conversation, provide structured feedback on the user's performance.

✅ Your tasks:
- Rate the user out of 10 on the following categories:
  • Technical Skills
  • Communication
  • Problem Solving
  • Experience
- Write a short summary (3 lines max) of how the interview went.
- Clearly state whether the candidate is recommended for hire.
- Add a one-line message to support the recommendation decision.

📦 Format your response strictly in this JSON structure (without triple backticks):

{
  "feedback": {
    "rating": {
      "technicalSkills": 0-10,
      "communication": 0-10,
      "problemSolving": 0-10,
      "experience": 0-10
    },
    "summary": "<3-line summary>",
    "recommendation": "Yes" or "No",
    "recommendationMsg": "<short reason>"
  }
}
`;
