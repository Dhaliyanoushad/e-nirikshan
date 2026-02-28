"use client";

import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProjectsPage() {
  const [districts, setDistricts] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchDistricts();
  }, []);

  // Capitalize function

  function capitalize(text) {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  async function fetchDistricts() {
    const { data, error } = await supabase.from("projects").select("district");

    if (error) return;

    const unique = [...new Set(data.map((i) => i.district).filter(Boolean))];

    // count projects per district

    const countMap = {};

    data.forEach((p) => {
      if (!p.district) return;

      countMap[p.district] = (countMap[p.district] || 0) + 1;
    });

    setDistricts(unique);
    setCounts(countMap);
  }

  return (
    <div className="min-h-screen bg-[#F5F9FC] pt-32 pb-20 px-8">
      {/* HEADER */}

      <div className="max-w-7xl mx-auto mb-14">
        <p className="text-[#4B8BBE] text-sm mb-2">Infrastructure Monitoring</p>

        <h1 className="text-4xl font-bold text-[#001F3F] mb-2">
          District Command Center
        </h1>

        <p className="text-gray-600">
          Select a district to view and monitor public infrastructure projects
        </p>
      </div>

      {/* GRID */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districts.map((district, index) => (
          <Link
            key={district}
            href={`/projects/${district.toLowerCase()}`}
            className="group"
          >
            <div
              className="


bg-white

rounded-xl

p-6

border border-[#4B8BBE]/20

shadow-sm

hover:shadow-lg

hover:border-[#0A4D92]

transition

duration-300

flex

justify-between

items-center

"
            >
              {/* LEFT */}

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <MapPin size={18} className="text-[#4B8BBE]" />

                  <h2
                    className="

text-lg

font-semibold

text-[#001F3F]

group-hover:text-[#0A4D92]

transition

"
                  >
                    {capitalize(district)}
                  </h2>
                </div>

                <p className="text-sm text-gray-500">
                  {counts[district] || 0} Projects
                </p>
              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-4">
                <div
                  className="

text-xs

text-[#4B8BBE]

font-medium

"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <ChevronRight
                  className="

text-[#4B8BBE]

group-hover:translate-x-1

transition

"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
