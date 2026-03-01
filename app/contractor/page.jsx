"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  FileText,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Layout,
  X,
  Info,
  Zap,
  Loader2, // Added for the loading state
} from "lucide-react";

export default function ContractorPage() {
  const [projects, setProjects] = useState([]);
  // UI States
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false); // New loading state

  const [form, setForm] = useState({
    project_name: "",
    location: "",
    start_date: "",
    end_date: "",
    project_summary: "",
    employee_count: "", // ADD THIS
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState({});

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
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0]);
      }
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handlePdfChange(e) {
    setPdfFile(e.target.files[0]);
  }

  async function createProject(e) {
    e.preventDefault();
    setIsDeploying(true); // Start loading

    try {
      let pdfUrl = null;
      if (pdfFile) {
        const fileName = `${Date.now()}_${pdfFile.name}`;
        await supabase.storage
          .from("project-reports")
          .upload(fileName, pdfFile);
        const { data } = supabase.storage
          .from("project-reports")
          .getPublicUrl(fileName);
        pdfUrl = data.publicUrl;
      }

      const { data: project, error } = await supabase
        .from("contractor_projects")
        .insert({
          project_name: form.project_name,
          location: form.location,
          start_date: form.start_date,
          end_date: form.end_date,
          project_summary: form.project_summary,
          employee_count: parseInt(form.employee_count) || 0,
          contractor_report_pdf: pdfUrl,
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        setIsDeploying(false);
        return;
      }

      if (pdfFile) {
        const formData = new FormData();
        formData.append("project_id", project.project_id);
        formData.append("pdf", pdfFile);
        formData.append("pdf_url", pdfUrl);
        formData.append("start_date", form.start_date);
        formData.append("end_date", form.end_date);

        // This is where the AI processing happens
        await fetch("/api/create-project", {
          method: "POST",
          body: formData,
        });
      }

      alert("Project Created with AI Analysis");
      setPdfFile(null);
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert("Error creating project");
    } finally {
      setIsDeploying(false); // Stop loading regardless of outcome
    }
  }

  function handlePhotoSelect(e, projectId) {
    setPhotoFiles({
      ...photoFiles,
      [projectId]: e.target.files[0],
    });
  }

  async function uploadPhoto(projectId) {
    const file = photoFiles[projectId];
    if (!file) {
      alert("Select photo first");
      return;
    }
    const fileName = `${Date.now()}_${file.name}`;
    await supabase.storage.from("project-photos").upload(fileName, file);
    const { data } = supabase.storage
      .from("project-photos")
      .getPublicUrl(fileName);
    const photoUrl = data.publicUrl;

    await supabase
      .from("contractor_projects")
      .update({
        latest_photo: {
          url: photoUrl,
          date: new Date(),
        },
      })
      .eq("project_id", projectId);

    const formData = new FormData();
    formData.append("project_id", projectId);
    formData.append("image", file);
    formData.append("image_url", photoUrl);

    await fetch("/api/update-project", {
      method: "POST",
      body: formData,
    });

    alert("Photo Uploaded & AI Updated");
    fetchProjects();
    const updated = await supabase
      .from("contractor_projects")
      .select("*")
      .eq("project_id", projectId)
      .single();
    setSelectedProject(updated.data);
  }

  return (
    <div className="flex h-screen bg-[#F5F9FC] overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-80 bg-[#001F3F] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold flex items-center gap-2 italic">
            <Layout size={24} /> e-Nirikshan
          </h1>
        </div>

        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Plus size={20} /> New Project
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Projects
          </p>
          {projects.map((project) => (
            <div
              key={project.project_id}
              onClick={() => setSelectedProject(project)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                selectedProject?.project_id === project.project_id
                  ? "bg-blue-500/20 border-blue-400 text-white"
                  : "bg-transparent border-transparent hover:bg-white/5 text-gray-300"
              }`}
            >
              <h3 className="font-semibold truncate">{project.project_name}</h3>
              <p className="text-xs opacity-70 truncate">{project.location}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-10">
        {selectedProject ? (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-bold text-[#001F3F]">
                  {selectedProject.project_name}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(
                      selectedProject.start_date,
                    ).toLocaleDateString()}{" "}
                    - {new Date(selectedProject.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {selectedProject.contractor_report_pdf && (
                <a
                  href={selectedProject.contractor_report_pdf}
                  target="_blank"
                  className="bg-white border border-gray-200 text-[#001F3F] px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-shadow flex items-center gap-2"
                >
                  <FileText size={18} /> View Report
                </a>
              )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {selectedProject.gemini_suggestions && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                      <Zap size={20} className="fill-blue-500 text-blue-500" />{" "}
                      AI Project Intelligence
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/60 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 font-bold uppercase">
                          Status
                        </p>
                        <p className="text-sm font-semibold capitalize">
                          {selectedProject.gemini_suggestions.status}
                        </p>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 font-bold uppercase">
                          Risk Level
                        </p>
                        <p className="text-sm font-semibold capitalize">
                          {selectedProject.gemini_suggestions.delayRisk}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <b>Progress Analysis:</b>{" "}
                        {selectedProject.gemini_suggestions.progress}
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed italic border-l-4 border-blue-400 pl-3">
                        <b>Recommendation:</b>{" "}
                        {selectedProject.gemini_suggestions.suggestion}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-100 flex justify-between items-center">
                      <span className="text-xs text-blue-700 font-bold">
                        ESTIMATED COMPLETION
                      </span>
                      <span className="text-2xl font-black text-blue-900">
                        {selectedProject.gemini_suggestions.completionPercent}%
                      </span>
                    </div>
                  </div>
                )}

                {selectedProject.contractor_report_timeline?.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#001F3F] mb-6 flex items-center gap-2">
                      <Calendar size={20} /> Milestone Roadmap
                    </h3>
                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                      {selectedProject.contractor_report_timeline.map(
                        (t, i) => {
                          const projectStart = new Date(
                            selectedProject.start_date,
                          );
                          const addMonths = (date, months) => {
                            const d = new Date(date);
                            d.setMonth(d.getMonth() + months);
                            return d;
                          };
                          const phaseStart = addMonths(projectStart, t.start);
                          const phaseEnd = addMonths(projectStart, t.end);

                          return (
                            <div key={i} className="relative pl-8">
                              <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-white bg-blue-500 shadow-sm" />
                              <p className="font-bold text-sm text-[#001F3F]">
                                {t.phase}
                              </p>
                              <p className="text-xs text-gray-500">
                                {phaseStart.toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                                {" → "}
                                {phaseEnd.toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#001F3F] mb-4 flex items-center gap-2">
                    <ImageIcon size={20} /> Site Evidence
                  </h3>

                  {selectedProject.latest_photo &&
                    (() => {
                      let photo;
                      try {
                        photo =
                          typeof selectedProject.latest_photo === "string"
                            ? JSON.parse(selectedProject.latest_photo)
                            : selectedProject.latest_photo;
                      } catch {
                        return null;
                      }

                      let imageUrl = photo.storage_path
                        ? supabase.storage
                            .from("project-photos")
                            .getPublicUrl(photo.storage_path).data.publicUrl
                        : photo.url;

                      if (!imageUrl) return null;

                      return (
                        <div className="mb-4">
                          <img
                            src={imageUrl}
                            className="w-full h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                          />
                          {photo.date && (
                            <p className="text-[10px] text-gray-500 mt-2 uppercase font-bold tracking-tighter">
                              Last Updated:{" "}
                              {new Date(photo.date).toLocaleString()}
                            </p>
                          )}
                        </div>
                      );
                    })()}

                  <div className="mt-4 space-y-3">
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handlePhotoSelect(e, selectedProject.project_id)
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center group-hover:border-blue-400 transition-colors">
                        <ImageIcon
                          className="mx-auto text-gray-400 group-hover:text-blue-500"
                          size={24}
                        />
                        <span className="text-xs text-gray-500 mt-1 block">
                          Click to select photo
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => uploadPhoto(selectedProject.project_id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl text-sm transition-colors shadow-sm"
                    >
                      Update AI via Photo
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#001F3F] mb-2 flex items-center gap-2">
                    <Info size={18} /> Project Summary
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    {selectedProject.project_summary ||
                      "No summary provided for this project."}
                  </p>
                  {/* EMPLOYEE COUNT SECTION */}

                  <div className="mt-4">
                    {/* Display */}

                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3">
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">
                        Employees On Site
                      </p>

                      <p className="text-xl font-bold text-blue-900">
                        {selectedProject.employee_count || 0}
                      </p>
                    </div>

                    {/* Button */}

                    <button
                      onClick={async () => {
                        const count = prompt(
                          "Enter number of employees on site:",
                        );

                        if (!count) return;

                        const { error } = await supabase

                          .from("contractor_projects")

                          .update({
                            employee_count: parseInt(count),
                          })

                          .eq("project_id", selectedProject.project_id);

                        if (error) {
                          alert("Failed to update employee count");

                          return;
                        }

                        alert("Employee count updated successfully");

                        fetchProjects();

                        const updated = await supabase

                          .from("contractor_projects")

                          .select("*")

                          .eq("project_id", selectedProject.project_id)

                          .single();

                        setSelectedProject(updated.data);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-sm transition shadow-sm"
                    >
                      Update Employee Count
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Layout size={48} className="mb-4 opacity-20" />
            <p>Select a project from the sidebar to view intelligence</p>
          </div>
        )}
      </main>

      {/* NEW PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-[#001F3F] text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Initialize New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:rotate-90 transition-transform disabled:opacity-50"
                disabled={isDeploying}
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={createProject}
              className="p-8 space-y-5 max-h-[80vh] overflow-y-auto"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Project Name
                </label>
                <input
                  name="project_name"
                  placeholder="e.g. Skyline Bridge Restoration"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Site Location
                </label>
                <input
                  name="location"
                  placeholder="City, Country"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Expected End
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Project Brief
                </label>
                <textarea
                  name="project_summary"
                  placeholder="Key objectives and scope..."
                  rows={3}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Employee Count
                </label>

                <input
                  type="number"
                  name="employee_count"
                  placeholder="Enter number of workers on site"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Baseline PDF Report
                </label>
                <div className="border-2 border-dashed border-gray-100 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {pdfFile && (
                    <p className="text-green-600 text-xs mt-2 font-bold italic">
                      PDF Ready for Analysis ✓
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isDeploying}
                className="w-full bg-[#001F3F] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Synthesizing Intelligence...
                  </>
                ) : (
                  "Deploy Project Intelligence"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
