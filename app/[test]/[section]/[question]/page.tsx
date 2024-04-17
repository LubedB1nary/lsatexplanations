"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import QuickJump from '@/app/QuickJump';

interface Question {
  id: number;
  test: number;
  section: number;
  question: number;
  section_type: string;
  explanation_main: string;
  answer_choice_a: string;
  answer_choice_b: string;
  answer_choice_c: string;
  answer_choice_d: string;
  answer_choice_e: string;
  audio_explanation_url: string;
  question_type: string;
  correct_answer: string;
  test_image_url: string;
}

export default function QuestionPage() {
  const { test, section, question } = useParams();
  const [questionData, setQuestionData] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const testParam = Array.isArray(test) ? test[0] : test;
        const sectionParam = Array.isArray(section) ? section[0] : section;
        const questionParam = Array.isArray(question) ? question[0] : question;
        const response = await axios.get(`/api/tests/${testParam}/sections/${sectionParam}/questions/${questionParam}`);
        setQuestionData(response.data.question);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [test, section, question]);

  const formatExplanationMain = (text: string) => {
    return text.replace(/<br>/g, '<br><br>');
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  const previousQuestion = questionData.question > 1 ? questionData.question - 1 : null;
  const nextQuestion = questionData.question < 26 ? questionData.question + 1 : null;

  return (
    <div className="bg-gray-background">
      {/* Navigation Bar */}
      <nav className="bg-gray-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-auto" src="/TutorRX_Logo.png" alt="Logo" />
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

      <div className="flex">
        <Sidebar />
        <div className="p-8 ml-64 w-full">
          <div className="flex items-center mb-8">
            {questionData.test_image_url && (
              <img
                src={questionData.test_image_url}
                alt={`PT${questionData.test}`}
                className="w-40 h-auto object-cover rounded-lg mr-8 "
              />
            )}
            <div>
              <h1 className="text-white text-4xl font-bold ml-4">
                PT{questionData.test}, Section {questionData.section}, Question {questionData.question}
              </h1>
              <div className="mt-2 ml-4">
                <p className="text-white text-lg">Question Type: {questionData.question_type}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div
              className="text-white"
              dangerouslySetInnerHTML={{
                __html: formatExplanationMain(questionData.explanation_main),
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {questionData.answer_choice_a && (
              <div
                className={`bg-gray-800 p-4 rounded-lg ${
                  questionData.correct_answer === 'A' ? 'bg-green-500' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-black font-bold">A</span>
                  </div>
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: questionData.answer_choice_a }}
                  />
                </div>
              </div>
            )}
            {questionData.answer_choice_b && (
              <div
                className={`bg-gray-800 p-4 rounded-lg ${
                  questionData.correct_answer === 'B' ? 'bg-green-500' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-black font-bold">B</span>
                  </div>
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: questionData.answer_choice_b }}
                  />
                </div>
              </div>
            )}
            {questionData.answer_choice_c && (
              <div
                className={`bg-gray-800 p-4 rounded-lg ${
                  questionData.correct_answer === 'C' ? 'bg-green-500' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-black font-bold">C</span>
                  </div>
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: questionData.answer_choice_c }}
                  />
                </div>
              </div>
            )}
            {questionData.answer_choice_d && (
              <div
                className={`bg-gray-800 p-4 rounded-lg ${
                  questionData.correct_answer === 'D' ? 'bg-green-500' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-black font-bold">D</span>
                  </div>
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: questionData.answer_choice_d }}
                  />
                </div>
              </div>
            )}
            {questionData.answer_choice_e && (
              <div
                className={`bg-gray-800 p-4 rounded-lg ${
                  questionData.correct_answer === 'E' ? 'bg-green-500' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-black font-bold">E</span>
                  </div>
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: questionData.answer_choice_e }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-8">
            <div className="flex justify-between">
              {previousQuestion && (
                <Link href={`/${questionData.test}/${questionData.section}/${previousQuestion}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Previous Question
                  </button>
                </Link>
              )}
              {nextQuestion && (
                <Link href={`/${questionData.test}/${questionData.section}/${nextQuestion}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Next Question
                  </button>
                </Link>
              )}
            </div>
            <div className="mt-4">
              <QuickJump />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}