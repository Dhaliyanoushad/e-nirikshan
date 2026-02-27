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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      {/* Pill container */}
      <nav
        className="
        flex items-center gap-8
        px-8 py-4
        rounded-full
        bg-[#001F3F]/80
        backdrop-blur-xl
        border border-[#4B8BBE]/30
        shadow-xl
      "
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <span className="text-[#4B8BBE]">e</span>

          <span className="text-white">-Nirikshan</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((link, i) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={i}
                href={link.path}
                className={`
                  relative
                  transition
                  font-medium
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-[#4B8BBE]"
                  }
                `}
              >
                {link.name}

                {/* Active dot */}
                {isActive && (
                  <span
                    className="
                    absolute
                    left-1/2
                    -bottom-3
                    -translate-x-1/2
                    w-1.5 h-1.5
                    rounded-full
                    bg-[#4B8BBE]
                  "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/reportissue"
          className="
            bg-[#0A4D92]
            text-white
            px-5 py-2
            rounded-full
            font-medium
            hover:bg-[#1B6F9A]
            transition
            duration-300
          "
        >
          Report Issue
        </Link>
      </nav>
    </div>
  );
}
