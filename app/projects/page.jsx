"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

export default function ProjectsPage() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    const { data, error } = await supabase

      .from("projects")

      .select("district");

    if (error) {
      console.error(error);

      return;
    }

    // remove duplicates

    const uniqueDistricts = [
      ...new Set(
        data

          .map((item) => item.district)

          .filter(Boolean),
      ),
    ];

    setDistricts(uniqueDistricts);
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] px-8 py-32">
      {/* Header */}

      <div className="max-w-7xl mx-auto mb-12">
        <p className="text-[#4B8BBE] mb-2">Home / Projects</p>

        <h1 className="text-4xl font-bold text-[#001F3F]">Select District</h1>

        <p className="text-gray-600 mt-2">
          Choose a district to view all infrastructure projects
        </p>
      </div>

      {/* Grid */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {districts.map((district, index) => (
          <Link
            key={district}
            href={`/projects/${district.toLowerCase()}`}
            className="group"
          >
            <div
              className="

              relative

              bg-white

              rounded-2xl

              p-8

              shadow-md

              border border-[#4B8BBE]/20

              hover:shadow-xl

              hover:-translate-y-1

              transition

            "
            >
              {/* glow */}

              <div
                className="

                absolute inset-0

                rounded-2xl

                bg-gradient-to-r from-[#0A4D92] to-[#4B8BBE]

                opacity-0

                group-hover:opacity-10

              "
              />

              {/* content */}

              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#001F3F]">
                    {district}
                  </h2>

                  <p className="text-sm text-gray-500">View Projects</p>
                </div>

                <MapPin className="text-[#4B8BBE]" />
              </div>

              {/* number */}

              <div className="absolute top-4 right-4 text-xs text-white bg-[#0A4D92] px-2 py-1 rounded">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
