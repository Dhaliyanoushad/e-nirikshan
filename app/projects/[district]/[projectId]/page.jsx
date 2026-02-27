"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase } from "../../../../lib/supabase";

export default function ProjectDetailPage() {
  const { district, projectId } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    const { data, error } = await supabase

      .from("projects")

      .select("*")

      .eq("id", projectId)

      .single();

    if (error) console.error(error);
    else setProject(data);
  };

  if (!project) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 space-y-8 bg-[#F5F9FC] min-h-screen">
      {/* Title */}

      <h1 className="text-3xl font-bold text-[#001F3F]">
        {project.project_name}
      </h1>

      {/* Basic Info */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

        <p>District: {project.district}</p>

        <p>Location: {project.location}</p>

        <p>Department: {project.department}</p>

        <p>Officer: {project.officer}</p>

        <p>Contractor: {project.contractor}</p>

        <p>Start Date: {project.startdate}</p>

        <p>Expected End: {project.enddate}</p>
      </div>

      {/* Budget */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Budget Details</h2>

        <p>Total Budget: {project.total_budget}</p>

        <p>Funds Released: {project.funds_released}</p>

        <p>Funds Used: {project.funds_used}</p>
      </div>

      {/* Progress */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Progress</h2>

        <p>Completion: {project.progress}%</p>

        <p>Current Stage: {project.current_stage}</p>

        <p>Status: {project.status}</p>
      </div>

      {/* Description */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Description</h2>

        <p>{project.project_description}</p>
      </div>

      {/* Map */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Location Coordinates</h2>

        <p>Latitude: {project.latitude}</p>

        <p>Longitude: {project.longitude}</p>
      </div>
    </div>
  );
}
