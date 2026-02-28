"use client";

import Link from "next/link";
// Importing a user icon for the button, though standard text works too
import { UserCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#001F3F] text-white px-8 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Logo + About */}
        <div>
          <Link href="/">
            <h2 className="text-2xl font-bold mb-4 cursor-pointer">
              <span className="text-[#4B8BBE]">e</span>-Nirikshan
            </h2>
          </Link>

          <p className="text-gray-300 text-sm">
            Public infrastructure monitoring platform for transparency,
            accountability, and citizen participation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-[#4B8BBE]">Quick Links</h3>

          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/projects" className="hover:text-white">
                Projects
              </Link>
            </li>

            <li>
              <Link href="/map" className="hover:text-white">
                Map
              </Link>
            </li>

            <li>
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/reportissue" className="hover:text-white">
                Report Issue
              </Link>
            </li>

            {/* CONTRACTOR LOGIN BUTTON */}
            <li className="pt-4">
              <Link href="/login">
                <button className="flex items-center gap-2 bg-[#4B8BBE] hover:bg-[#3b6d96] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg">
                  <UserCircle size={18} />
                  Contractor Login
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="font-semibold mb-4 text-[#4B8BBE]">Platform</h3>

          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/dashboard" className="hover:text-white">
                Transparency Index
              </Link>
            </li>

            <li>
              <Link href="/map" className="hover:text-white">
                Live Tracking
              </Link>
            </li>

            <li>
              <Link href="/projects" className="hover:text-white">
                All Projects
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-[#4B8BBE]">Contact</h3>

          <p className="text-gray-300 text-sm">Public Works Department</p>

          <p className="text-gray-300 text-sm">support@enirikshan.gov.in</p>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-[#4B8BBE]/30 mt-12 pt-6 text-center text-gray-400 text-sm">
        © 2026 e-Nirikshan Government of India
      </div>
    </footer>
  );
}
