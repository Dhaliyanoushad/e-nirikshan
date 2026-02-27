"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/projects?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative min-h-screen flex items-center px-8 md:px-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/jcb.jpg')" }}
      />

      {/* Dark navy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/90 via-[#001F3F]/70 to-transparent" />

      {/* Brand blue tint overlay */}
      <div className="absolute inset-0 bg-[#0A4D92]/30" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-left">
        <p className="text-[#4B8BBE] text-lg mb-4 font-medium">
          Public Monitoring Platform
        </p>

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6 text-white">
          e-Nirikshan
        </h1>

        <p className="text-gray-200 text-lg mb-10 max-w-xl">
          Monitor public projects with transparency, accountability, and
          real-time citizen participation.
        </p>

        {/* Glass Search */}
        <div className="flex max-w-xl backdrop-blur-xl bg-white/95 rounded-full overflow-hidden shadow-2xl border border-[#4B8BBE]/40">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any public project"
            className="flex-1 px-6 py-4 outline-none text-[#001F3F] bg-transparent placeholder-gray-500"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={handleSearch}
            className="
              bg-[#0A4D92]
              text-white
              px-8
              font-semibold
              hover:bg-[#1B6F9A]
              transition
              duration-300
            "
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
