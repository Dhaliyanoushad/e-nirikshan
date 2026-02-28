"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function ContractorPage() {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    project_name: "",
    location: "",
    start_date: "",
    end_date: "",
    project_summary: "",
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

    if (!error) setProjects(data);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  //
  // SELECT PDF
  //

  function handlePdfChange(e) {
    setPdfFile(e.target.files[0]);
  }

  //
  // CREATE PROJECT
  //

  async function createProject(e) {
    e.preventDefault();

    try {
      let pdfUrl = null;

      //
      // Upload PDF
      //

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

      //
      // Insert Project
      //

      const { data: project, error } = await supabase

        .from("contractor_projects")

        .insert({
          project_name: form.project_name,
          location: form.location,
          start_date: form.start_date,
          end_date: form.end_date,
          project_summary: form.project_summary,
          contractor_report_pdf: pdfUrl,
        })

        .select()

        .single();

      if (error) {
        alert(error.message);
        return;
      }

      //
      // Call Gemini Engine
      //

      if (pdfFile) {
        const formData = new FormData();

        formData.append("project_id", project.project_id);

        formData.append("pdf", pdfFile);

        formData.append("pdf_url", pdfUrl);

        formData.append("start_date", form.start_date);

        formData.append("end_date", form.end_date);

        await fetch("/api/create-project", {
          method: "POST",
          body: formData,
        });
      }

      alert("Project Created with AI Analysis");

      setPdfFile(null);

      fetchProjects();
    } catch (err) {
      alert("Error");
    }
  }

  //
  // SELECT PHOTO
  //

  function handlePhotoSelect(e, projectId) {
    setPhotoFiles({
      ...photoFiles,
      [projectId]: e.target.files[0],
    });
  }

  //
  // UPLOAD PHOTO BUTTON
  //

  async function uploadPhoto(projectId) {
    const file = photoFiles[projectId];

    if (!file) {
      alert("Select photo first");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    await supabase.storage

      .from("project-photos")

      .upload(fileName, file);

    const { data } = supabase.storage

      .from("project-photos")

      .getPublicUrl(fileName);

    const photoUrl = data.publicUrl;

    //
    // Update DB
    //

    await supabase

      .from("contractor_projects")

      .update({
        latest_photo: {
          url: photoUrl,
          date: new Date(),
        },
      })

      .eq("project_id", projectId);

    //
    // Call Gemini
    //

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
  }

  return (
    <div className="min-h-screen bg-[#F5F9FC] p-10">
      <h1 className="text-3xl font-bold text-[#001F3F] mb-8">
        Contractor Intelligence Dashboard
      </h1>

      {/* CREATE PROJECT */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

        <form onSubmit={createProject} className="space-y-4">
          <input
            name="project_name"
            placeholder="Project Name"
            className="border p-3 w-full rounded"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="border p-3 w-full rounded"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="start_date"
            className="border p-3 w-full rounded"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="end_date"
            className="border p-3 w-full rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="project_summary"
            placeholder="Summary"
            className="border p-3 w-full rounded"
            onChange={handleChange}
          />

          {/* PDF */}

          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
            />

            {pdfFile && (
              <p className="text-green-600 text-sm mt-1">PDF Selected ✓</p>
            )}
          </div>

          <button className="bg-[#0A4D92] text-white px-6 py-3 rounded hover:bg-[#08386b]">
            Create Project
          </button>
        </form>
      </div>

      {/* EXISTING PROJECTS */}

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Existing Projects</h2>

        {projects.map((project) => (
          <div
            key={project.project_id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h3 className="font-bold text-lg text-[#001F3F]">
              {project.project_name}
            </h3>

            <p className="text-gray-500">{project.location}</p>

            {/* PDF Preview */}

            {project.contractor_report_pdf && (
              <a
                href={project.contractor_report_pdf}
                target="_blank"
                className="text-blue-600 text-sm block mt-2"
              >
                View Report PDF
              </a>
            )}

            {/* IMAGE PREVIEW */}

            {project.latest_photo &&
              (() => {
                let photo;

                try {
                  photo =
                    typeof project.latest_photo === "string"
                      ? JSON.parse(project.latest_photo)
                      : project.latest_photo;
                } catch {
                  return null;
                }

                // GET IMAGE URL SAFELY

                let imageUrl = null;

                if (photo.storage_path) {
                  imageUrl = supabase.storage
                    .from("project-photos")
                    .getPublicUrl(photo.storage_path).data.publicUrl;
                } else if (photo.url) {
                  imageUrl = photo.url;
                }

                if (!imageUrl) return null;

                return (
                  <div className="mt-3">
                    <img src={imageUrl} className="w-48 rounded border" />

                    {photo.date && (
                      <p className="text-sm text-gray-600 mt-1">
                        📅 {new Date(photo.date).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                );
              })()}

            {/* PHOTO SELECT */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoSelect(e, project.project_id)}
              className="mt-3"
            />

            {/* UPLOAD BUTTON */}

            <button
              onClick={() => uploadPhoto(project.project_id)}
              className="block mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Upload Photo
            </button>

            {/* Gemini Suggestions */}

            {project.gemini_suggestions && (
              <div className="mt-4 bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800">AI Suggestions</p>

                {/* Status */}

                <p className="text-sm text-blue-700">
                  <b>Status:</b> {project.gemini_suggestions.status}
                </p>

                {/* Progress */}

                <p className="text-sm text-blue-700">
                  <b>Progress:</b> {project.gemini_suggestions.progress}
                </p>

                {/* Suggestion */}

                <p className="text-sm text-blue-700">
                  <b>Suggestion:</b> {project.gemini_suggestions.suggestion}
                </p>

                {/* Completion */}

                <p className="text-sm text-blue-700">
                  <b>Completion:</b>{" "}
                  {project.gemini_suggestions.completionPercent}%
                </p>

                {/* Delay */}

                <p className="text-sm text-blue-700">
                  <b>Delay Risk:</b> {project.gemini_suggestions.delayRisk}
                </p>

                {/* Expected Phase */}

                <p className="text-sm text-blue-700">
                  <b>Expected Phase:</b>{" "}
                  {project.gemini_suggestions.expectedPhase}
                </p>
              </div>
            )}

            {/* Timeline */}

            {project.contractor_report_timeline?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Timeline</p>

                {project.contractor_report_timeline.map((t, i) => {
                  const projectStart = new Date(project.start_date);

                  // function to add months
                  const addMonths = (date, months) => {
                    const d = new Date(date);

                    d.setMonth(d.getMonth() + months);

                    return d;
                  };

                  const phaseStart = addMonths(projectStart, t.start);

                  const phaseEnd = addMonths(projectStart, t.end);

                  return (
                    <div key={i} className="text-sm text-gray-700 mb-2">
                      📅{" "}
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
                      <br />
                      🏗️ {t.phase}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
