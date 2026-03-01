"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- CUSTOM ICON FUNCTION ---------- */
function createIcon(color) {
  if (typeof window === 'undefined') return null;
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
}

/* ---------- STATUS COLOR ---------- */
function getColor(status) {
  if (!status) return "#3b82f6";
  status = status.toLowerCase();
  if (status === "completed") return "#22c55e";
  if (status === "ongoing") return "#f59e0b";
  if (status === "delayed") return "#ef4444";
  if (status === "risk") return "#f59e0b";
  return "#3b82f6";
}

export default function KeralaMapClient({ initialProjects }) {
  return (
    <div className="bg-[#F5F9FC] min-h-screen pt-28 px-8">
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <div className="text-[#4B8BBE] text-sm">
            Infrastructure Intelligence
          </div>
          <div className="text-3xl font-bold text-[#001F3F]">
            Kerala Live Project Map
          </div>
        </div>

        <div className="bg-[#001F3F] text-white px-5 py-4 rounded-xl shadow-xl border border-[#4B8BBE]/40">
          <div className="font-semibold mb-2">Status</div>
          <LegendItem color="#22c55e" text="Completed" />
          <LegendItem color="#f59e0b" text="Ongoing" />
          <LegendItem color="#ef4444" text="Delayed" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#4B8BBE]/30">
        <MapContainer
          center={[10.8505, 76.2711]}
          zoom={7}
          zoomControl={false}
          style={{ height: "75vh", width: "100%" }}
        >
          <ZoomControl position="bottomright" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {initialProjects.map((project) => (
            <Marker
              key={project.id}
              position={[project.latitude, project.longitude]}
              icon={createIcon(getColor(project.status))}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold text-[#001F3F]">
                    {project.project_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {project.location}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: getColor(project.status) }}
                  >
                    {project.status}
                  </div>
                  <Link
                    href={`/projects/${project.district}/${project.id}`}
                    className="text-[#0074D9] font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function LegendItem({ color, text }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      {text}
    </div>
  );
}

function LegendItem({ color, text }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      {text}
    </div>
  );
}
