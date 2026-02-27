const projects = [
  "NH Highway Expansion",
  "Smart City Water Grid",
  "Metro Phase 3",
];

export default function RecentProjects() {
  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold text-[#1A3263] mb-6">
        Recently Updated Projects
      </h2>

      <div className="space-y-4">
        {projects.map((p, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}
