import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { test: string } }) {
  const testId = parseInt(params.test);

  try {
    const sections = await prisma.questions.groupBy({
      by: ['section', 'section_type'],
      where: {
        test: testId,
      },
      orderBy: {
        section: 'asc',
      },
      _count: {
        question: true,
      },
    });

    const sectionsWithQuestions = await Promise.all(
      sections.map(async (section) => {
        const questions = await prisma.questions.findMany({
          where: {
            test: testId,
            section: section.section,
          },
          select: {
            question: true,
          },
          orderBy: {
            question: 'asc',
          },
        });

        return {
          section: section.section,
          section_type: section.section_type,
          questions: questions.map((q) => q.question),
        };
      })
    );

    return NextResponse.json({ sections: sectionsWithQuestions });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}