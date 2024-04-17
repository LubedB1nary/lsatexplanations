"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import SectionCard from '../components/SectionCard';
import QuickJump from '../QuickJump';

interface Section {
  section: number;
  section_type: string;
  questions: number[];
}

export default function TestSections() {
  const { test } = useParams();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const testParam = Array.isArray(test) ? test[0] : test;
        const response = await axios.get(`/api/tests/${testParam}/sections`);
        setSections(response.data.sections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, [test]);

  const testParam = Array.isArray(test) ? test[0] : test;

  return (
    <div className="bg-gray-background">
      {/* Navigation Bar */}
      <nav className="bg-custom-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
              </div>
              <div className="ml-4">
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
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
            Sections for Test {testParam}
          </h1>
          <p className="mt-3 max-w-3xl text-xl text-indigo-100 sm:mt-5 sm:text-2xl">
            Explore the sections and questions for Test {testParam}.
          </p>
        </div>
      </div>

      {/* QuickJump Component */}
      <div className="mx-10 mt-8 flex justify-center">
        <QuickJump />
      </div>

      {/* Section Cards */}
      <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 mx-auto">
        {sections.map((section) => (
          <div key={section.section} className="mb-4">
            <SectionCard
              key={section.section}
              test={parseInt(testParam)}
              section={section.section}
              sectionType={section.section_type}
              questions={section.questions}
            />
          </div>
        ))}
      </div>
    </div>
  );
}