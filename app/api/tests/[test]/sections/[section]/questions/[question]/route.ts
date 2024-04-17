import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { test: string, section: string, question: string } }) {
  const testId = parseInt(params.test);
  const sectionId = parseInt(params.section);
  const questionId = parseInt(params.question);

  try {
    const question = await prisma.questions.findFirst({
      where: {
        test: testId,
        section: sectionId,
        question: questionId,
      },
      select: {
        id: true,
        test: true,
        section: true,
        question: true,
        section_type: true,
        explanation_main: true,
        answer_choice_a: true,
        answer_choice_b: true,
        answer_choice_c: true,
        answer_choice_d: true,
        answer_choice_e: true,
        audio_explanation_url: true,
        question_type: true,
        correct_answer: true,
        test_image_url: true, // Add this line
      },
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 });
  }
}