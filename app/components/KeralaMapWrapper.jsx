"use client";

import dynamic from "next/dynamic";

const KeralaMapClient = dynamic(() => import("./KeralaMapClient"), {
  ssr: false,
  loading: () => (
    <div className="bg-[#F5F9FC] min-h-screen pt-28 px-8 flex flex-col items-center">
      <div className="w-full max-w-7xl h-[75vh] bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-2xl border border-gray-200 shadow-inner">
        <div className="text-gray-400 font-bold text-lg mb-2">Initializing Map Data</div>
        <div className="text-gray-300 text-sm">Synchronizing with geographic services...</div>
      </div>
    </div>
  )
});

export default function KeralaMapWrapper({ initialProjects }) {
  return <KeralaMapClient initialProjects={initialProjects} />;
}
