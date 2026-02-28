"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  LayoutDashboard,
  ShieldCheck,
  Info,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function CivilianDashboard() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("contractor_projects")
      .select("*")
      .order("project_id", { ascending: false });

    if (!error) {
      setProjects(data);
      setSelected(data[0]);
    }
  }

  if (!selected) return null;

  const gemini =
    typeof selected.gemini_suggestions === "string"
      ? JSON.parse(selected.gemini_suggestions)
      : selected.gemini_suggestions;

  const photo =
    typeof selected.latest_photo === "string"
      ? JSON.parse(selected.latest_photo)
      : selected.latest_photo;

  const timeline =
    typeof selected.contractor_report_timeline === "string"
      ? JSON.parse(selected.contractor_report_timeline)
      : selected.contractor_report_timeline;

  const completion = gemini?.completionPercent || 0;
  const expected = gemini?.expectedProgress || 0;

  const imageUrl =
    photo?.url ||
    supabase.storage
      .from("project-photos")
      .getPublicUrl(photo?.storage_path || "").data.publicUrl;

  return (
    <div className="min-h-screen flex bg-[#f0f4f8] font-sans relative">
      {/* SIDEBAR - Fixed to prevent overlap on scroll */}
      <div className="w-80 bg-[#001529] text-white shadow-2xl flex flex-col fixed h-screen z-20">
        <div className="p-8 border-b border-white/10 bg-[#002140]">
          <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
            <ShieldCheck className="text-[#FF9933]" />
            CIVILIAN PORTAL
          </h1>
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            Transparency Unit
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#001529]">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">
            Active Directory
          </p>
          {projects.map((p) => (
            <div
              key={p.project_id}
              onClick={() => setSelected(p)}
              className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                selected.project_id === p.project_id
                  ? "bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-900/20"
                  : "border-transparent hover:bg-white/5 hover:border-white/10"
              }`}
            >
              <div
                className={`font-bold text-sm ${selected.project_id === p.project_id ? "text-blue-400" : "text-slate-300"}`}
              >
                {p.project_name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 group-hover:text-slate-400 transition-colors">
                REF: #{p.project_id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT - ml-80 pushes it away from fixed sidebar */}
      <div className="flex-1 ml-80 overflow-y-auto min-h-screen">
        {/* HEADER - Sticky and higher z-index than content */}
        {/* <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-6 px-10 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-slate-400" size={20} />
            <h1 className="text-sm font-black text-slate-500 uppercase tracking-widest">
              Project Surveillance Data
            </h1>
          </div>
          <div className="bg-slate-100 px-4 py-1.5 rounded-full text-[11px] font-bold text-slate-500 border border-slate-200">
            SYSTEM STATUS:{" "}
            <span className="text-emerald-600 font-black tracking-tighter uppercase">
              Encrypted & Live
            </span>
          </div>
        </div> */}

        {/* DASHBOARD AREA - pt-10 provides breathing room under navbar */}
        <div className="max-w-6xl mx-auto p-10 pt-32">
          <div className="bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,40,85,0.06)] border-t-[6px] border-[#FF9933] overflow-hidden">
            {/* TITLE HEADER */}
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start gap-6 bg-gradient-to-b from-slate-50/50 to-transparent">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-tighter italic">
                    PID {selected.project_id}
                  </span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    {selected.location}
                  </span>
                </div>
                <h2 className="text-4xl font-black text-[#002855] tracking-tight leading-none">
                  {selected.project_name}
                </h2>
                <p className="flex items-center gap-1.5 text-blue-600 font-bold text-sm mt-5">
                  <MapPin size={18} className="text-red-500" />
                  Site Location:{" "}
                  <span className="text-slate-600 font-semibold ml-1">
                    {selected.location}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <div
                  className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm border ${
                    gemini?.status === "on_track"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  <span className="mr-2 opacity-50 font-black">●</span>
                  STATUS: {gemini?.status?.replace("_", " ") || "ON TRACK"}
                </div>
                <p className="text-[11px] text-slate-400 mt-4 font-bold uppercase flex items-center justify-end gap-1.5 tracking-wider">
                  <Clock size={14} className="text-blue-400" />
                  Update Sync: {new Date().toDateString()}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2">
              {/* LEFT DATA PANEL */}
              <div className="p-10 border-r border-slate-100 space-y-10">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">
                      Physical Work Completion
                    </label>
                    <span className="font-black text-4xl text-[#002855] tracking-tighter italic">
                      {completion}
                      <span className="text-xl ml-0.5 text-blue-400">%</span>
                    </span>
                  </div>
                  <div className="bg-slate-100 h-5 rounded-full p-1 border border-slate-200 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#002855] via-blue-700 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#f8fbff] border border-blue-100 rounded-2xl p-8 relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <h4 className="font-black text-[11px] mb-4 uppercase text-blue-800 tracking-widest flex items-center gap-2">
                    <Info size={14} /> Intelligence Overview
                  </h4>
                  <p className="text-slate-600 text-sm italic leading-relaxed font-medium">
                    "{gemini?.progress}"
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-[11px] mb-6 uppercase text-slate-400 tracking-[0.2em] flex items-center gap-3">
                    Milestone Tracking{" "}
                    <span className="h-px bg-slate-100 flex-1" />
                  </h4>
                  <div className="space-y-3">
                    {timeline?.map((t, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-white border border-slate-100 rounded-xl px-5 py-4 hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-900">
                          {t.phase}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT MEDIA PANEL */}
              <div className="p-10 bg-slate-50/50 space-y-8">
                <div className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={imageUrl}
                    className="w-full aspect-video object-cover rounded-2xl shadow-2xl border-4 border-white transform transition-transform duration-700 group-hover:scale-[1.05]"
                    alt="Latest Site Upload"
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg border border-white/20 uppercase">
                      Live Site Photo
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-slate-50">
                        <td className="p-4 font-black text-[10px] text-slate-400 uppercase bg-slate-50/50 w-1/3">
                          Commencement
                        </td>
                        <td className="p-4 font-bold text-slate-700">
                          {selected.start_date}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="p-4 font-black text-[10px] text-slate-400 uppercase bg-slate-50/50">
                          Target End Date
                        </td>
                        <td className="p-4 font-bold text-slate-700">
                          {selected.end_date}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="p-4 font-black text-[10px] text-slate-400 uppercase bg-slate-50/50">
                          Planned Scope
                        </td>
                        <td className="p-4 text-rose-600 font-black text-lg italic">
                          {expected}%
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-[10px] text-slate-400 uppercase bg-slate-50/50">
                          Performance
                        </td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-black text-xs uppercase border border-emerald-200 shadow-sm">
                            +{completion - expected}% Ahead of Schedule
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-[#001f4d] rounded-2xl text-center shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12" />
                  <p className="text-[10px] text-blue-300 font-black uppercase tracking-[0.3em] mb-1">
                    Public Guarantee
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed italic">
                    Data is cross-verified via satellite and on-site AI sensors
                    to ensure zero-fraud reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
