const stats = [
  { label: "Total Projects", value: "12,540" },
  { label: "Active Projects", value: "8,210" },
  { label: "Delayed Projects", value: "1,430" },
  { label: "Budget Utilization", value: "74%" },
];

export default function Stats() {
  return (
    <section className="px-6 py-10">
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-3xl font-bold text-[#1A3263]">{s.value}</p>
            <p className="text-[#547792]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
