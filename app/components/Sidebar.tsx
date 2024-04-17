import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronDown, FaChevronRight, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

interface Test {
  test: number;
  sections: Section[];
}

interface Section {
  section: number;
  questions: number[];
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openTests, setOpenTests] = useState<number[]>([]);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await axios.get('/api/sidebar');
        setTests(response.data.tests.sort((a: { test: number; }, b: { test: number; }) => b.test - a.test));
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    fetchSidebarData();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTest = (testId: number) => {
    setOpenTests((prevOpenTests) => {
      if (prevOpenTests.includes(testId)) {
        return prevOpenTests.filter((id) => id !== testId);
      } else {
        return [...prevOpenTests, testId];
      }
    });
  };

  const toggleSection = (sectionId: number) => {
    setOpenSections((prevOpenSections) => {
      if (prevOpenSections.includes(sectionId)) {
        return prevOpenSections.filter((id) => id !== sectionId);
      } else {
        return [...prevOpenSections, sectionId];
      }
    });
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-800 p-4 m-4 mt-20 rounded-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <div className="flex items-center text-white">
              <FaHome className="mr-2" />
              <span>Home</span>
            </div>
          </Link>
          <button className="text-white focus:outline-none" onClick={toggleSidebar}>
            <FaChevronLeft />
          </button>
        </div>
        <h2 className="text-white text-xl font-bold mb-4">PTs</h2>
        <div className="overflow-y-auto h-[calc(100vh-128px)]">
          <ul>
            {tests.map((test) => (
              <li key={test.test}>
                <button
                  className="flex items-center text-white focus:outline-none"
                  onClick={() => toggleTest(test.test)}
                >
                  <FaChevronDown
                    className={`mr-2 transition-transform duration-300 ease-in-out ${
                      openTests.includes(test.test) ? 'rotate-180' : ''
                    }`}
                  />
                  <span>PT {test.test}</span>
                </button>
                {openTests.includes(test.test) && (
                  <ul className="ml-4">
                    {test.sections.map((section) => (
                      <li key={section.section}>
                        <button
                          className="flex items-center text-white focus:outline-none"
                          onClick={() => toggleSection(section.section)}
                        >
                          <FaChevronDown
                            className={`mr-2 transition-transform duration-300 ease-in-out ${
                              openSections.includes(section.section) ? 'rotate-180' : ''
                            }`}
                          />
                          <span>Section {section.section}</span>
                        </button>
                        {openSections.includes(section.section) && (
                          <ul className="ml-8">
                            {section.questions.map((question) => (
                              <li key={question}>
                                <Link href={`/${test.test}/${section.section}/${question}`}>
                                  <span className="text-white">Question {question}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!isOpen && (
        <button
          className="fixed left-0 top-4 bg-gray-800 text-white px-4 py-1 rounded-r mt-20"
          onClick={toggleSidebar}
        >
          <FaChevronRight />
        </button>
      )}
    </>
  );
}