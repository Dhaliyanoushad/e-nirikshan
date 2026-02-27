export default function Capabilities() {
  const features = [
    {
      title: "Live Project Tracking",
      desc: "Monitor infrastructure progress in real time",
    },

    {
      title: "Citizen Reporting",
      desc: "Report issues and ensure accountability",
    },

    {
      title: "Interactive Map",
      desc: "View projects across districts visually",
    },

    {
      title: "Progress Analytics",
      desc: "Track completion rates and delays",
    },

    {
      title: "Government Transparency",
      desc: "Open access to project information",
    },

    {
      title: "Real-Time Updates",
      desc: "Stay informed with latest updates",
    },
  ];

  return (
    <section className="bg-white py-24 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 text-[#001F3F]">
          Platform Capabilities
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="
                p-8
                border
                border-[#4B8BBE]/30
                rounded-xl
                hover:bg-[#0A4D92]
                hover:text-white
                transition
              "
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>

              <p className="text-gray-600 group-hover:text-white">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
