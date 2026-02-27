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

  const getStatus = (status) => {
    if (status === "delayed") return "bg-red-100 text-red-600";

    if (status === "risk") return "bg-yellow-100 text-yellow-600";

    return "bg-green-100 text-green-600";
  };

  const getProgressColor = (status) => {
    if (status === "delayed") return "bg-red-500";

    if (status === "risk") return "bg-yellow-500";

    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] px-8 py-12">
      {/* Header */}

      <div className="max-w-7xl mx-auto mb-12">
        <p className="text-[#4B8BBE] mb-2">Home / Projects / {district}</p>

        <h1 className="text-4xl font-bold text-[#001F3F] capitalize">
          {district} Projects
        </h1>

        <p className="text-gray-600 mt-2">
          Monitor project progress and status
        </p>
      </div>

      {/* Grid */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${district}/${project.id}`}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-md border border-[#4B8BBE]/20 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition">
              {/* Image */}

              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />

                {/* Status */}

                <div
                  className={`

                  absolute top-4 left-4

                  px-3 py-1

                  text-xs

                  font-semibold

                  rounded-full

                  ${getStatus(project.status)}

                `}
                >
                  {project.status === "delayed" && "Delayed"}

                  {project.status === "risk" && "At Risk"}

                  {project.status === "onTime" && "On Time"}
                </div>
              </div>

              {/* Content */}

              <div className="p-6">
                <h2 className="text-lg font-semibold text-[#001F3F] mb-1">
                  {project.name}
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  {project.department}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#0A4D92] font-semibold">
                    {project.budget}
                  </span>

                  <span className="text-sm text-gray-500">
                    {project.progress}%
                  </span>
                </div>

                {/* Progress Bar */}

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`

                      h-2

                      rounded-full

                      ${getProgressColor(project.status)}

                    `}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
