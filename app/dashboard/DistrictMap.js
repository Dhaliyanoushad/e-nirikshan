"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Map components (disable SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function DistrictMap() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">District Progress Map</h2>

      <MapContainer
        center={[10.8505, 76.2711]}
        zoom={7}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[9.9312, 76.2673]}>
          <Popup>Kochi – 65% Complete</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}