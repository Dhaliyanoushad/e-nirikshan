"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

/* COUNT UP ANIMATION */

function CountUp({ end, duration = 1.5 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);

        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return count.toLocaleString();
}

export default function Stats() {
  const [stats, setStats] = useState([
    { value: 0, label: "TOTAL PROJECTS" },

    { value: 0, label: "ONGOING PROJECTS" },

    { value: 0, label: "COMPLETED PROJECTS" },

    { value: 0, label: "DELAYED PROJECTS" },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { count: total } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    const { count: ongoing } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .ilike("status", "ongoing");

    const { count: completed } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .ilike("status", "completed");

    const { count: delayed } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .or("status.ilike.delayed,status.ilike.risk");

    setStats([
      { value: total || 0, label: "TOTAL PROJECTS" },
      { value: ongoing || 0, label: "ONGOING PROJECTS" },
      { value: completed || 0, label: "COMPLETED PROJECTS" },
      { value: delayed || 0, label: "DELAYED PROJECTS" },
    ]);
  }

  return (
    <section className="bg-[#001F3F] py-20 px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}

        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              Bringing transparency and accountability to public infrastructure.
            </h2>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="w-10 h-[2px] bg-[#4B8BBE] mb-4" />

                <h3 className="text-4xl font-bold mb-2">
                  <CountUp end={stat.value} />+
                </h3>

                <p className="text-[#4B8BBE] text-sm tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}

        <div
          className="

          mt-16

          flex

          flex-col

          md:flex-row

          items-center

          justify-between

          gap-6

          border-t

          border-[#4B8BBE]/30

          pt-8

        "
        >
          <p className="text-[#4B8BBE]">
            Strengthening governance through real-time monitoring
          </p>

          <Link
            href="/projects"
            className="

              border

              border-[#4B8BBE]

              px-6

              py-3

              rounded-full

              hover:bg-[#0A4D92]

              transition

            "
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
