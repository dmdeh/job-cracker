import {
  ANSWER_PROMPTS,
  SYSTEM_PROMPTS,
  USER_PROMPTS,
} from '@/app/constants/prompts';
import { openai } from '@/app/services/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { keyword, answer } = await request.json();

    const userPrompt = answer
      ? ANSWER_PROMPTS(keyword, answer)
      : USER_PROMPTS(keyword);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      question: response.question,
      feedback: response.feedback,
      hasTailQuestion: response.hasTailQuestion,
    });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
