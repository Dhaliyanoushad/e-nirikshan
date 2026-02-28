"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    setProject(data);
  }

  if (!project)
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5F9FC]">
        Loading...
      </div>
    );

  return (
    <div className="bg-[#F5F9FC] min-h-screen">
      {/* HEADER */}

      <div className="bg-[#001F3F] text-white px-10 py-6 shadow">
        <div className="text-sm opacity-70">Project Intelligence Dashboard</div>

        <div className="text-3xl font-semibold mt-1">
          {project.project_name}
        </div>
      </div>

      <div className="p-10 grid grid-cols-3 gap-8">
        {/* LEFT PANEL */}

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <Section title="Project Information">
            <Info label="District" value={project.district} />

            <Info label="Location" value={project.location} />

            <Info label="Department" value={project.department} />

            <Info label="Officer In Charge" value={project.officer} />

            <Info label="Contractor" value={project.contractor} />
          </Section>

          <Section title="Timeline">
            <Info label="Start Date" value={project.startdate} />

            <Info label="Expected Completion" value={project.enddate} />

            <Info label="Current Stage" value={project.current_stage} />

            <Info label="Status" value={project.status} />
          </Section>
        </div>

        {/* RIGHT PANEL */}

        <div className="col-span-2 space-y-8">
          {/* PROGRESS */}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-3">
              <div className="font-semibold text-[#001F3F]">
                Physical Progress
              </div>

              <div className="font-semibold text-[#0074D9]">
                {project.progress}%
              </div>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-[#0074D9] h-3 rounded"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>
          </div>

          {/* BUDGET */}

          <div className="grid grid-cols-3 gap-6">
            <BudgetCard title="Total Budget" value={project.total_budget} />

            <BudgetCard title="Funds Released" value={project.funds_released} />

            <BudgetCard title="Funds Used" value={project.funds_used} />
          </div>

          {/* DESCRIPTION */}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-[#001F3F] mb-2">
              Project Description
            </div>

            <div className="text-gray-700">{project.project_description}</div>
          </div>

          {/* MAP */}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-[#001F3F] mb-4">
              Project Location
            </div>

            <iframe
              className="w-full h-80 rounded"
              src={`https://maps.google.com/maps?q=${project.latitude},${project.longitude}&z=15&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="font-semibold text-[#001F3F] mb-3">{title}</div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <div className="text-gray-500">{label}</div>

      <div className="font-medium text-[#001F3F] text-right">{value}</div>
    </div>
  );
}

function BudgetCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="text-sm text-gray-500">{title}</div>

      <div className="text-xl font-semibold text-[#001F3F] mt-1">₹{value}</div>
    </div>
  );
}
