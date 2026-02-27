"use client";
import Link from "next/link";

const districts = [
  "Trivandrum",
  "Kollam",
  "Ernakulam",
  "Kozhikode",
];

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Select District
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {districts.map((district) => (
          <Link
            key={district}
            href={`/projects/${district.toLowerCase()}`}
          >
            <div className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700">
                {district}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}