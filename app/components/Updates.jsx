"use client";

import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  CloudSun,
} from "lucide-react";

export default function Updates() {
  // This data represents the JSON object you provided
  const projectData = {
    project_name: "Bridge Restoration",
    location: "Munnar",
    weather: { condition: "Clear", description: "clear sky" },
    ai: {
      status: "on_track",
      progress:
        "Foundation work on the piers is complete, and a major section of the bridge's steel superstructure is being lifted into place.",
      delayRisk: "medium",
      completionPercent: 40,
      expectedProgress: 24,
    },
  };

  const updates = [
    {
      title: `${projectData.project_name} - AI Progress Update`,
      type: projectData.ai.status === "on_track" ? "success" : "delay",
      time: "Just Now",
      description: projectData.ai.progress,
      meta: `${projectData.ai.completionPercent}% Complete (Ahead of ${projectData.ai.expectedProgress}% target)`,
    },
    {
      title: `Site Weather: ${projectData.location}`,
      type: "weather",
      time: "Live",
      description: `Current condition is ${projectData.weather.description}. Ideal for superstructure lifting and heavy machinery operations.`,
      meta: "Clear Skies",
    },
    {
      title: "Risk Assessment: Medium",
      type: "delay",
      time: "Analysis",
      description:
        "Rigging and alignment for heavy lifts identified as primary focus area for the current phase.",
      meta: "Safety Protocol Active",
    },
  ];

  return (
    <section className="bg-[#F5F9FC] py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#001F3F] flex items-center gap-3">
              <Bell className="text-blue-500 fill-blue-500/20" size={32} />
              Project Intelligence
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Live updates for{" "}
              <span className="text-blue-600">
                ID #23: {projectData.location}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {updates.map((update, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex items-start gap-5"
            >
              <div
                className={`mt-1 p-3 rounded-xl ${
                  update.type === "delay"
                    ? "bg-amber-50 text-amber-600"
                    : update.type === "success"
                      ? "bg-green-50 text-green-600"
                      : update.type === "weather"
                        ? "bg-blue-50 text-blue-500"
                        : "bg-blue-50 text-blue-600"
                }`}
              >
                {update.type === "delay" ? (
                  <AlertCircle size={24} />
                ) : update.type === "success" ? (
                  <CheckCircle2 size={24} />
                ) : update.type === "weather" ? (
                  <CloudSun size={24} />
                ) : (
                  <Clock size={24} />
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-[#001F3F] group-hover:text-blue-700 transition-colors">
                    {update.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {update.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {update.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase tracking-tighter">
                    {update.meta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
