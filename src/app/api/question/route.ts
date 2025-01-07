import { NextResponse } from "next/server";
import {
  SYSTEM_PROMPTS,
  USER_PROMPTS,
  ANSWER_PROMPTS,
} from "@/app/constants/prompts";
import { openai } from "@/app/services/openai";

export async function POST(request: Request) {
  try {
    const { keyword, answer } = await request.json();

    const userPrompt = answer
      ? ANSWER_PROMPTS.content(keyword, answer)
      : USER_PROMPTS.content(keyword);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.content },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      question: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
