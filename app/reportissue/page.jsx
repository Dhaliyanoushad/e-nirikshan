"use client";

import { useState, useEffect } from "react";

export default function ReportIssuePage() {

  const MAX_REPORTS = 3;

  const [reportCount, setReportCount] = useState(0);

  const [formData, setFormData] = useState({
    project: "",
    issueType: "",
    description: "",
    severity: "",
    latitude: "",
    longitude: "",
    name: "",
    email: "",
  });

  // Load report count from browser
  useEffect(() => {
    const stored = localStorage.getItem("reportCount");
    if (stored) setReportCount(Number(stored));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📍 Capture Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
      },
      () => alert("Location permission required")
    );
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (reportCount >= MAX_REPORTS) {
      alert("Maximum 3 reports allowed from this device");
      return;
    }

    if (!formData.latitude) {
      alert("Please capture location before submitting");
      return;
    }

    const newCount = reportCount + 1;
    localStorage.setItem("reportCount", newCount);
    setReportCount(newCount);

    console.log(formData);

    alert("Issue Submitted Successfully ✅");
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "#F5F5F2" }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* HEADER */}
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "#17513E" }}
        >
          Report Infrastructure Issue
        </h1>

        <p className="mb-4" style={{ color: "#6B7280" }}>
          Verified citizen observations supporting transparent governance.
        </p>

        <p className="mb-6 font-medium">
          Reports Remaining :
          <span style={{ color: "#CD481A" }}>
            {" "} {MAX_REPORTS - reportCount}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PROJECT */}
          <select
            name="project"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Select Project</option>
            <option>NH Road Expansion</option>
            <option>Bridge Construction</option>
          </select>

          {/* ISSUE TYPE */}
          <select
            name="issueType"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Issue Type</option>
            <option>Work Stopped</option>
            <option>Construction Delay</option>
            <option>Poor Quality</option>
            <option>Safety Hazard</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Describe the issue"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* FILE UPLOAD BOX */}
          <div>
            <label className="font-medium block mb-2">
              Upload Evidence
            </label>

            <label
              className="flex flex-col items-center justify-center
              border-2 border-dashed rounded-lg p-6 cursor-pointer
              hover:bg-gray-50"
              style={{ borderColor: "#6B7280" }}
            >
              <p style={{ color: "#6B7280" }}>
                Click to upload images
              </p>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) =>
                  alert(`${e.target.files.length} file(s) selected`)
                }
              />
            </label>
          </div>

          {/* LOCATION */}
          <div>
            <label className="font-medium block mb-2">
              Capture Location
            </label>

            <button
              type="button"
              onClick={getLocation}
              style={{ backgroundColor: "#17513E" }}
              className="text-white px-5 py-2 rounded"
            >
              Capture Location
            </button>

            {/* RED WARNING */}
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "#CD481A" }}
            >
              ⚠ Location access required. Reporting allowed only
              within 500m of project site.
            </p>

            {formData.latitude && (
              <p
                className="mt-2 text-sm"
                style={{ color: "#6B7280" }}
              >
                📍 {formData.latitude} ,
                {" "}
                {formData.longitude}
              </p>
            )}
          </div>

          {/* SEVERITY */}
          <div>
            <p className="font-medium mb-2">Severity</p>

            {["Low", "Medium", "High", "Critical"].map((level) => (
              <label key={level} className="mr-5">
                <input
                  type="radio"
                  name="severity"
                  value={level}
                  required
                  onChange={handleChange}
                />
                {" "} {level}
              </label>
            ))}
          </div>

          {/* REPORTER */}
          <input
            name="name"
            placeholder="Name (Optional)"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="email"
            placeholder="Email (Optional)"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* DECLARATION */}
          <label className="flex gap-2">
            <input type="checkbox" required />
            I confirm submitted information is accurate.
          </label>

          {/* SUBMIT */}
          <button
            type="submit"
            style={{ backgroundColor: "#CD481A" }}
            className="w-full text-white py-3 rounded-lg font-semibold"
          >
            Submit Issue
          </button>

        </form>
      </div>
    </div>
  );
}