export default function Stats() {
  const stats = [
    { title: "Total Projects", value: "1,284" },
    { title: "Ongoing", value: "643" },
    { title: "Completed", value: "512" },
    { title: "Delayed", value: "129" },
  ];

  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
              bg-[#001F3F]
              text-white
              p-8
              rounded-xl
              shadow-lg
              hover:bg-[#0A4D92]
              transition
            "
          >
            <h2 className="text-4xl font-bold mb-2">{stat.value}</h2>

            <p className="text-[#4B8BBE]">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
