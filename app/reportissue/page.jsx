"use client";

import { useState, useEffect } from "react";
import { MapPin, Upload } from "lucide-react";

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

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
      },

      () => alert("Location permission required"),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reportCount >= MAX_REPORTS) {
      alert("Maximum reports reached");

      return;
    }

    if (!formData.latitude) {
      alert("Capture location first");

      return;
    }

    const newCount = reportCount + 1;

    localStorage.setItem("reportCount", newCount);

    setReportCount(newCount);

    alert("Issue submitted successfully");
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <p className="text-[#4B8BBE]">Home / Report Issue</p>

          <h1 className="text-4xl font-bold text-[#001F3F] mt-2">
            Report Infrastructure Issue
          </h1>

          <p className="text-gray-600 mt-2">
            Help improve transparency by reporting issues in public projects
          </p>
        </div>

        {/* Card */}

        <div className="bg-white rounded-2xl shadow-lg border border-[#4B8BBE]/20 p-8">
          {/* Remaining */}

          <div className="mb-6">
            <p className="font-medium text-gray-600">
              Reports Remaining :
              <span className="text-[#0A4D92] font-bold ml-2">
                {MAX_REPORTS - reportCount}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project */}

            <select
              name="project"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#0A4D92] outline-none"
            >
              <option>Select Project</option>

              <option>NH Road Expansion</option>

              <option>Bridge Construction</option>
            </select>

            {/* Issue Type */}

            <select
              name="issueType"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#0A4D92]"
            >
              <option>Issue Type</option>

              <option>Work Stopped</option>

              <option>Construction Delay</option>

              <option>Poor Quality</option>

              <option>Safety Hazard</option>
            </select>

            {/* Description */}

            <textarea
              name="description"
              required
              rows="4"
              placeholder="Describe the issue"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#0A4D92]"
            />

            {/* Upload */}

            <label className="border-2 border-dashed border-[#4B8BBE]/40 rounded-lg p-8 flex flex-col items-center cursor-pointer hover:bg-[#F5F9FC] transition">
              <Upload className="text-[#4B8BBE] mb-2" />
              Upload Evidence
              <input type="file" hidden />
            </label>

            {/* Location */}

            <div>
              <button
                type="button"
                onClick={getLocation}
                className="flex items-center gap-2 bg-[#0A4D92] text-white px-5 py-2 rounded-lg hover:bg-[#1B6F9A]"
              >
                <MapPin size={18} />
                Capture Location
              </button>

              {formData.latitude && (
                <p className="text-sm text-gray-500 mt-2">
                  📍 Location captured
                </p>
              )}
            </div>

            {/* Severity */}

            <div>
              <p className="font-medium mb-2 text-[#001F3F]">Severity</p>

              {["Low", "Medium", "High", "Critical"].map((level) => (
                <label key={level} className="mr-6 text-gray-600">
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    required
                    onChange={handleChange}
                  />{" "}
                  {level}
                </label>
              ))}
            </div>

            {/* Reporter */}

            <input
              name="name"
              placeholder="Name (Optional)"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            <input
              name="email"
              placeholder="Email (Optional)"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {/* Declaration */}

            <label className="flex gap-2 text-gray-600">
              <input type="checkbox" required />I confirm information is
              accurate
            </label>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-[#0A4D92] text-white py-3 rounded-lg font-semibold hover:bg-[#1B6F9A] transition"
            >
              Submit Issue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
