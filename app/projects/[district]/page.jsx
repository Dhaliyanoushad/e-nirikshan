"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const projects = [
  {
    id: "road-001",
    name: "Road Expansion Project",
    department: "PWD",
    budget: "₹10 Cr",
    progress: 60,
    status: "risk",
    image: "/projects/road.jpg",
  },
  {
    id: "bridge-002",
    name: "Bridge Construction",
    department: "PWD",
    budget: "₹25 Cr",
    progress: 40,
    status: "delayed",
    image: "/projects/bridge.jpg",
  },
  {
    id: "hospital-003",
    name: "Hospital Upgrade",
    department: "Health",
    budget: "₹15 Cr",
    progress: 80,
    status: "onTime",
    image: "/projects/hospital.jpg",
  },
];

export default function DistrictProjectsPage() {
  const { district } = useParams();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        {district} Projects
      </h1>

      {/* Grid Layout Like Screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${district}/${project.id}`}
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden">

              {/* Image */}
              <div className="relative h-36 w-full">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />

                {/* Corner Status Ribbon */}
                {project.status === "delayed" && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1">
                    Delayed
                  </div>
                )}

                {project.status === "risk" && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1">
                    Risk
                  </div>
                )}

                {project.status === "onTime" && (
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1">
                    On Time
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 text-center">

                <h2 className="text-sm font-semibold">
                  {project.name}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {project.department}
                </p>

                <p className="text-sm text-blue-600 font-medium mt-2">
                  {project.budget}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Progress: {project.progress}%
                </p>

              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}