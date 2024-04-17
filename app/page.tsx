"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import TestCard from './TestCard';
import QuickJump from './QuickJump';

interface Test {
  test: number;
  test_date: string;
  test_image_url: string;
}

export default function Home() {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/api/tests');
        const sortedTests = response.data.tests.sort((a: Test, b: Test) => b.test - a.test);
        setTests(sortedTests);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, []);

  return (
    <div className="bg-gray-background">
      {/* Navigation Bar */}
      <nav className="bg-custom-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-auto" src="TutorRX_Logo.png" alt="Logo" />
              </div>
              <div className="ml-4">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header/Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            LSAT Explanations
          </h1>
          <p className="mt-3 max-w-3xl text-xl text-indigo-100 sm:mt-5 sm:text-2xl">
            Unlock your potential with our comprehensive LSAT explanations.
          </p>
        </div>
      </div>

      {/* Test Cards */}
      <h1 className="text-white text-4xl font-bold mt-8 mb-8 text-center">Practice Tests</h1>
      <div className='mx-10 mt-8 flex items-center '>
          <QuickJump />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 w-3/4 mx-auto">
        {tests.map((test) => (
          <TestCard key={test.test} test={test.test} testDate={test.test_date} testImageUrl={test.test_image_url} />
        ))}
      </div>
    </div>
  );
}