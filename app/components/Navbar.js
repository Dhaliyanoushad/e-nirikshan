"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["Home", "Projects", "Map", "Dashboard"];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#547792]/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-[#1A3263]">e-Nirikshan</h1>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link, i) => (
            <a
              key={i}
              href="#"
              className="text-[#1A3263] hover:text-[#547792] transition"
            >
              {link}
            </a>
          ))}

          <button className="bg-[#FAB95B] text-black px-4 py-2 rounded-lg hover:opacity-90 transition">
            Report Issue
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#1A3263]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white">
          {links.map((link, i) => (
            <a key={i} href="#" className="block text-[#1A3263]">
              {link}
            </a>
          ))}

          <button className="w-full bg-[#FAB95B] text-black py-2 rounded">
            Report Issue
          </button>
        </div>
      )}
    </nav>
  );
}
