"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase } from "../../../lib/supabase";

export default function DistrictProjectsPage() {
  const { district } = useParams();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [district]);

  const fetchProjects = async () => {
    if (!district) return;

    const { data, error } = await supabase

      .from("projects")

      .select("*")

      .eq("district", district.toLowerCase())

      .order("id", { ascending: true });

    if (error) console.error(error);
    else setProjects(data);
  };

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
        <p className="text-[#4B8BBE]">Home / Projects / {district}</p>

        <h1 className="text-4xl font-bold text-[#001F3F] capitalize">
          {district} Projects
        </h1>

        <p className="text-gray-600 mt-2">
          Monitor project progress and status
        </p>
      </div>

      {/* Grid */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${district}/${project.id}`}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-md border border-[#4B8BBE]/20 p-6 hover:shadow-xl hover:-translate-y-1 transition">
              {/* Status */}

              <div
                className={`

                inline-block

                px-3 py-1

                text-xs

                font-semibold

                rounded-full

                mb-3

                ${getStatus(project.status)}

              `}
              >
                {project.status}
              </div>

              {/* Project Name */}

              <h2 className="text-lg font-semibold text-[#001F3F]">
                {project.project_name}
              </h2>

              {/* Department */}

              <p className="text-sm text-gray-500 mb-2">{project.department}</p>

              {/* Budget + Progress */}

              <div className="flex justify-between text-sm">
                <span className="text-[#0A4D92] font-semibold">
                  {project.budget}
                </span>

                <span>{project.progress}%</span>
              </div>

              {/* Progress Bar */}

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
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
          </Link>
        ))}

        {/* Empty state */}

        {projects.length === 0 && (
          <p className="text-gray-500">No projects found</p>
        )}
      </div>
    </div>
  );
}
