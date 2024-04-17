// /api/quickjump/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get('testId');
  const sectionId = searchParams.get('sectionId');

  try {
    if (!testId) {
      const tests = await prisma.questions.findMany({
        select: {
          test: true,
        },
        distinct: ['test'],
        orderBy: {
          test: 'desc',
        },
      });

      return NextResponse.json({ tests });
    } else if (!sectionId) {
      const sections = await prisma.questions.findMany({
        where: {
          test: parseInt(testId),
        },
        select: {
          section: true,
        },
        distinct: ['section'],
        orderBy: {
          section: 'asc',
        },
      });

      return NextResponse.json({ sections });
    } else {
      const questions = await prisma.questions.findMany({
        where: {
          test: parseInt(testId),
          section: parseInt(sectionId),
        },
        select: {
          question: true,
        },
        orderBy: {
          question: 'asc',
        },
      });

      return NextResponse.json({ questions });
    }
  } catch (error) {
    console.error('Error fetching data for QuickJump:', error);
    return NextResponse.json({ error: 'Failed to fetch data for QuickJump' }, { status: 500 });
  }
}