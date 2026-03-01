"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function About() {
  const router = useRouter();

  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { count, error } = await supabase

      .from("projects")

      .select("*", { count: "exact", head: true });

    if (!error) setTotalProjects(count);
  }

  return (
    <section className="bg-[#F5F9FC] py-28 px-8 relative overflow-hidden">
      {/* background accent */}

      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#4B8BBE]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
        {/* IMAGE */}

        <div className="relative">
          <img src="hum.jpeg" className="rounded-xl shadow-2xl" />

          {/* DYNAMIC FLOAT CARD */}

          <div
            className="

absolute

-bottom-6

-left-6

bg-white

shadow-xl

rounded-lg

px-6

py-4

border border-[#4B8BBE]/20

backdrop-blur-lg

"
          >
            <div className="text-sm text-gray-500">Projects Monitored</div>

            <div className="text-2xl font-bold text-[#001F3F]">
              {totalProjects}+
            </div>
          </div>
        </div>

        {/* TEXT */}

        <div>
          <p className="text-[#4B8BBE] font-semibold mb-4 tracking-wide">
            ABOUT PLATFORM
          </p>

          <h2
            className="

text-4xl

md:text-5xl

font-bold

text-[#001F3F]

mb-6

leading-tight

"
          >
            Infrastructure Intelligence
            <span className="block text-[#0A4D92]">
              for Public Transparency
            </span>
          </h2>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            e-Nirikshan provides real-time visibility into infrastructure
            projects across districts. Detect delays, monitor execution, and
            ensure government accountability using live project intelligence.
          </p>

          <div className="space-y-4 mb-10">
            <Feature text="Live project monitoring" />

            <Feature text="Delay & risk detection" />

            <Feature text="District-level dashboards" />

            <Feature text="Citizen transparency" />
          </div>

          {/* WORKING BUTTON */}

          <button
            onClick={() => router.push("/updates")}
            className="

bg-[#0A4D92]

text-white

px-8

py-4

rounded-lg

font-semibold

hover:bg-[#1B6F9A]

transition

shadow-lg

"
          >
            Explore Projects →
          </button>
        </div>
      </div>
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-[#0A4D92] rounded-full" />

      <div className="text-[#001F3F] font-medium">{text}</div>
    </div>
  );
}
