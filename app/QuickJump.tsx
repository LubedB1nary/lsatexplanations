// QuickJump.tsx
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Test {
  test: number;
}

interface Section {
  section: number;
}

interface Question {
  question: number;
}

export default function QuickJump() {
  const [tests, setTests] = useState<Test[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/api/quickjump');
        setTests(response.data.tests);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/api/quickjump?testId=${selectedTest}`);
        setSections(response.data.sections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    if (selectedTest) {
      fetchSections();
    }
  }, [selectedTest]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/quickjump?testId=${selectedTest}&sectionId=${selectedSection}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedTest && selectedSection) {
      fetchQuestions();
    }
  }, [selectedTest, selectedSection]);

  const handleTestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const testId = parseInt(event.target.value);
    setSelectedTest(testId);
    setSelectedSection(null);
    setSelectedQuestion(null);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sectionId = parseInt(event.target.value);
    setSelectedSection(sectionId);
    setSelectedQuestion(null);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const questionId = parseInt(event.target.value);
    setSelectedQuestion(questionId);
  };

  const handleJumpClick = () => {
    if (selectedTest && selectedSection && selectedQuestion) {
      router.push(`/${selectedTest}/${selectedSection}/${selectedQuestion}`);
    }
  };

  return (
    <div className="bg-custom-gray shadow-xl rounded-lg p-6 mb-8 w-2/3 mx-auto ">
      <h2 className="text-xl font-bold mb-4 text-white flex justify-center">Quick Navigate</h2>
      <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
        <div className="md:w-1/3">
          <label htmlFor="testSelect" className="block text-sm font-medium text-white">
            PT
          </label>
          <select
            id="testSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-custom-gray-hover text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedTest || ''}
            onChange={handleTestChange}
          >
            <option value="">Select PT</option>
            {tests.map((test) => (
              <option key={test.test} value={test.test}>
                PT {test.test}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/3">
          <label htmlFor="sectionSelect" className="block text-sm font-medium text-white">
            Section
          </label>
          <select
            id="sectionSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-custom-gray-hover text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedSection || ''}
            onChange={handleSectionChange}
            disabled={!selectedTest}
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.section} value={section.section}>
                Section {section.section}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/3">
          <label htmlFor="questionSelect" className="block text-sm font-medium text-white">
            Question
          </label>
          <select
            id="questionSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-custom-gray-hover text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedQuestion || ''}
            onChange={handleQuestionChange}
            disabled={!selectedTest || !selectedSection}
          >
            <option value="">Select Question</option>
            {questions.map((question) => (
              <option key={question.question} value={question.question}>
                Question {question.question}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto mx-auto"
          onClick={handleJumpClick}
          disabled={!selectedTest || !selectedSection || !selectedQuestion}
        >
          Jump
        </button>
      </div>
    </div>
  );
}