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

  const getStatusColor = (status) => {
    if (status === "delayed") return "text-red-600";
    if (status === "risk") return "text-yellow-600";
    return "text-green-600";
  };

  const getProgressColor = (status) => {
    if (status === "delayed") return "bg-red-500";
    if (status === "risk") return "bg-yellow-500";
    return "bg-blue-600";
  };

  return (
    <div className="bg-[#F5F9FC] min-h-screen pt-28">
      {/* HEADER */}

      <div className="bg-[#001F3F] text-white px-12 py-10 shadow mb-10">
        <p className="text-sm text-[#4B8BBE] mb-1">District Command Center</p>

        <h1 className="text-4xl font-bold capitalize">
          {district} Infrastructure
        </h1>

        <p className="text-sm text-gray-300 mt-2">
          Total Projects: {projects.length}
        </p>
      </div>

      {/* PROJECT LIST */}

      <div className="max-w-7xl mx-auto px-10 pb-16 space-y-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${district}/${project.id}`}>
            <div className="bg-white border border-[#001F3F]/10 rounded-xl px-8 py-7 hover:shadow-lg hover:border-[#0074D9] transition cursor-pointer">
              <div className="grid grid-cols-5 items-center gap-6">
                {/* LEFT */}

                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-[#001F3F]">
                    {project.project_name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {project.department}
                  </p>
                </div>

                {/* LOCATION */}

                <div className="text-sm text-gray-700">{project.location}</div>

                {/* BUDGET */}

                <div className="font-semibold text-[#0A4D92]">
                  {project.budget}
                </div>

                {/* RIGHT */}

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span
                      className={`font-semibold ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>

                    <span className="text-gray-600">{project.progress}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(project.status)}`}
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* EMPTY */}

        {projects.length === 0 && (
          <div className="text-center text-gray-500 pt-20">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}
