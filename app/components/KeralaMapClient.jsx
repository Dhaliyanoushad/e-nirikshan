"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

/* ---------- STATUS COLOR UTILITY ---------- */
function getColor(status) {
  if (!status) return "#3b82f6";
  const s = status.toLowerCase();
  if (s === "completed") return "#22c55e";
  if (s === "ongoing") return "#f59e0b";
  if (s === "delayed") return "#ef4444";
  if (s === "risk") return "#f59e0b";
  return "#3b82f6";
}

/* ---------- MAIN COMPONENT ---------- */
export default function KeralaMapClient({ initialProjects }) {
  const [L, setL] = useState(null);

  useEffect(() => {
    // Dynamic import Leaflet only on the client side
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  // Custom Icon Generator (Dependent on Leaflet instance)
  const createIcon = (color) => {
    if (!L) return null;
    return new L.DivIcon({
      className: "",
      html: `
        <div style="
          width:18px;
          height:18px;
          border-radius:50%;
          background:${color};
          border:3px solid white;
          box-shadow:
          0 0 0 4px ${color}30,
          0 0 12px ${color};
        "></div>
      `,
    });
  };

  // Skeleton / Loading state while Leaflet loads
  if (!L) {
    return (
      <div className="bg-[#F5F9FC] min-h-screen pt-28 px-8 flex flex-col items-center">
        <div className="w-full max-w-7xl h-[75vh] bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-2xl border border-gray-200 shadow-inner">
          <div className="text-gray-400 font-bold text-lg mb-2">Initializing Map Data</div>
          <div className="text-gray-300 text-sm">Synchronizing with geographic services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F9FC] min-h-screen pt-28 px-8">
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <div className="text-[#4B8BBE] text-sm font-bold uppercase tracking-widest">
            Infrastructure Intelligence
          </div>
          <div className="text-4xl font-black text-[#001F3F]">
            Kerala Live Project Map
          </div>
        </div>

        <div className="bg-[#001F3F] text-white px-6 py-4 rounded-2xl shadow-2xl border border-[#4B8BBE]/40 flex flex-col gap-2">
          <div className="font-bold text-xs uppercase text-blue-300 tracking-tighter opacity-80">Legend</div>
          <LegendItem color="#22c55e" text="Completed" />
          <LegendItem color="#f59e0b" text="Ongoing/Risk" />
          <LegendItem color="#ef4444" text="Delayed" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#4B8BBE]/20 bg-white p-2">
        <MapContainer
          center={[10.8505, 76.2711]}
          zoom={7}
          zoomControl={false}
          style={{ height: "75vh", width: "100%", borderRadius: '1.25rem' }}
        >
          <ZoomControl position="bottomright" />
          <TileLayer 
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {initialProjects.map((project) => (
            <Marker
              key={project.id}
              position={[project.latitude, project.longitude]}
              icon={createIcon(getColor(project.status))}
            >
              <Popup className="custom-popup">
                <div className="p-1 space-y-2">
                  <div className="font-black text-[#001F3F] text-base leading-tight">
                    {project.project_name}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin size={12} /> {project.location}
                  </div>
                  <div
                    className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${getColor(project.status)}20`, color: getColor(project.status) }}
                  >
                    {project.status || 'Active'}
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <Link
                      href={`/projects/${project.district}/${project.id}`}
                      className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1"
                    >
                      View Full Intelligence →
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

/* ---------- LEGEND HELPER ---------- */
function LegendItem({ color, text }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]" style={{ background: color }} />
      {text}
    </div>
  );
}

// Icon helper missing from original cleanup
function MapPin({ size }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}
