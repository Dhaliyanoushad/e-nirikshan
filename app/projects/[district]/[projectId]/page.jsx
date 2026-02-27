"use client";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const { district, projectId } = useParams();

  const project = {
    name: "Bridge Construction",
    department: "PWD",
    officer: "Rajesh Kumar",
    contractor: "ABC Infra Pvt Ltd",
    startDate: "01 Jan 2025",
    expectedEnd: "01 Jan 2026",
    totalBudget: "₹25 Cr",
    released: "₹18 Cr",
    used: "₹15 Cr",
    progress: 40,
    stage: "Foundation Work",
    delayDays: 32,
    delayReason: "Heavy rainfall and material shortage",
  };

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        {project.name}
      </h1>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p>District: {district}</p>
        <p>Department: {project.department}</p>
        <p>Officer: {project.officer}</p>
        <p>Contractor: {project.contractor}</p>
        <p>Start Date: {project.startDate}</p>
        <p>Expected End: {project.expectedEnd}</p>
      </div>

      {/* Budget Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Budget Details</h2>
        <p>Total Budget: {project.totalBudget}</p>
        <p>Funds Released: {project.released}</p>
        <p>Funds Used: {project.used}</p>
      </div>

      {/* Progress Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Progress</h2>
        <p>Completion: {project.progress}%</p>
        <p>Current Stage: {project.stage}</p>
      </div>

      {/* Delay Section */}
      {project.delayDays > 0 && (
        <div className="bg-red-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-red-700">
            Delay Information
          </h2>
          <p>Delay: {project.delayDays} Days</p>
          <p>Reason: {project.delayReason}</p>
        </div>
      )}

      {/* Citizen Reports */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Citizen Reports
        </h2>
        <p>No issues reported yet.</p>
      </div>

      {/* Project History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Project History
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Project Created</li>
          <li>Funds Released</li>
          <li>Progress Updated to 40%</li>
          <li>Delay Added (32 days)</li>
        </ul>
      </div>

    </div>
  );
}