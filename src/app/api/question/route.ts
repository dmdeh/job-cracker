import { NextResponse } from "next/server";
import { SYSTEM_PROMPTS, USER_PROMPTS } from "@/app/constants/prompts";
import { openai } from "@/app/services/openai";

export async function POST(request: Request) {
  try {
    const { keyword, questionList } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.content(questionList) },
        { role: "user", content: USER_PROMPTS.content(keyword) },
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
