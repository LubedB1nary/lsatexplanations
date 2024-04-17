import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tests = await prisma.questions.findMany({
      select: {
        test: true,
        section: true,
        question: true,
      },
      orderBy: [
        { test: 'asc' },
        { section: 'asc' },
        { question: 'asc' },
      ],
    });

    const groupedTests = tests.reduce((acc, curr) => {
      const testIndex = acc.findIndex((item) => item.test === curr.test);
      if (testIndex === -1) {
        acc.push({
          test: curr.test ?? null,
          sections: [
            {
              section: curr.section ?? null,
              questions: [curr.question ?? null],
            },
          ],
        });
      } else {
        const sectionIndex = acc[testIndex].sections.findIndex(
          (item) => item.section === curr.section
        );
        if (sectionIndex === -1) {
          acc[testIndex].sections.push({
            section: curr.section ?? null,
            questions: [curr.question ?? null],
          });
        } else {
          acc[testIndex].sections[sectionIndex].questions.push(curr.question ?? null);
        }
      }
      return acc;
    }, [] as { test: number | null; sections: { section: number | null; questions: (number | null)[] }[] }[]);

    return NextResponse.json({ tests: groupedTests });
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    return NextResponse.json({ error: 'Failed to fetch sidebar data' }, { status: 500 });
  }
}