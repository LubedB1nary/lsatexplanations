// app/api/tests/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const tests = await prisma.questions.findMany({
      select: {
        test: true,
        test_date: true,
        test_image_url: true,
      },
      distinct: ['test'],
      orderBy: {
        test: 'desc',
      },
    });

    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 });
  }
}