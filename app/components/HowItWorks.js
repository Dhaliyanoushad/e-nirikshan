const steps = [
  "Project Sanction",
  "Real-time Monitoring",
  "Automated Accountability",
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-12 bg-white text-center">
      <h2 className="text-3xl font-bold text-[#1A3263] mb-8">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="p-6">
            <div className="text-4xl font-bold text-[#FAB95B] mb-2">
              {i + 1}
            </div>
            <p>{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
