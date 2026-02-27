export default function Updates() {
  const updates = [
    "Bridge project progress updated",

    "Road construction delayed",

    "New highway approved",
  ];

  return (
    <section className="bg-[#F8FBFF] py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-[#001F3F]">
          Recent Updates
        </h2>

        {updates.map((update, i) => (
          <div
            key={i}
            className="
              bg-white
              p-6
              mb-4
              rounded-lg
              shadow
              border-l-4
              border-[#0A4D92]
            "
          >
            {update}
          </div>
        ))}
      </div>
    </section>
  );
}
