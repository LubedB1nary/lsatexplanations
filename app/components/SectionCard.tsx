import { FcFinePrint, FcReading } from "react-icons/fc";
import Link from 'next/link';

interface SectionCardProps {
  test: number;
  section: number;
  sectionType: string;
  questions: number[];
}

export default function SectionCard({ test, section, sectionType, questions }: SectionCardProps) {
  const getSectionIcon = (sectionType: string) => {
    if (sectionType === 'Logical Reasoning') return <FcFinePrint />;
    if (sectionType === 'Reading Comprehension') return <FcReading />;
    // if (sectionType === 'Reading Comprehension') return <FaBook />;
    // if (sectionType === 'Analytical Reasoning') return <FaChess />;
    // Placeholder icon
    return <span>Icon</span>;
  };

  return (
    <div className="bg-custom-gray p-4 rounded-lg max-w-[300px] w-fit mx-auto">
      <div className="flex items-center mb-4">
        <div className="text-white text-3xl mr-2">{getSectionIcon(sectionType)}</div>
        <h2 className="text-white text-xl font-bold">Section {section}</h2>
      </div>
      <p className="text-gray-300 text-sm mb-4">{sectionType}</p>
      <div className="grid grid-cols-2 gap-2">
        {questions.map((question) => (
          <Link key={question} href={`/${test}/${section}/${question}`}>
            <div className="bg-custom-gray-hover text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-200">
              Question {question}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}