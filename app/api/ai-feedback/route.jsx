import OpenAI from "openai";
import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    // Validate conversation data
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation data is required" },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-12b-it:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      // response_format: { type: "json_object" } // Enable this if your prompt asks for JSON
    });

    const response = completion.choices[0].message;

    if (!response || !response.content) {
      return NextResponse.json(
        { error: "No content received from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Feedback API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
