"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Map", path: "/map" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F5F2] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-extrabold tracking-tight cursor-pointer">
            <span className="text-[#CD481A]">e</span>
            <span className="text-[#17513E]">-Nirikshan</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link, i) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={i}
                href={link.path}
                className={`relative font-medium transition ${
                  isActive
                    ? "text-[#CD481A]"
                    : "text-[#17513E] hover:text-black"
                }`}
              >
                {link.name}

                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#CD481A] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/reportissue"
            className="bg-[#CD481A] text-white font-semibold px-5 py-2 rounded-md hover:opacity-90 transition"
          >
            Report Issue
          </Link>
        </div>
      </div>
    </nav>
  );
}
