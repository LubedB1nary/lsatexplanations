import Link from "next/link";

interface TestCardProps {
  test: number;
  testDate: string;
  testImageUrl: string;
}

export default function TestCard({ test, testDate, testImageUrl }: TestCardProps) {
  return (
    <Link href={`/${test}`}>
      <div className="relative p-6 rounded-lg shadow-md bg-custom-gray transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg border-grey-800 hover:bg-black">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={testImageUrl}
            alt={`PT${test}`}
            className="w-full h-40 object-cover transition duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>
        <div className="mt-6">
          <h2 className="text-white text-2xl font-bold mb-2">PT{test}</h2>
          <p className="text-gray-300 text-sm">{testDate}</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rounded-lg opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
      </div>
    </Link>
  );
}