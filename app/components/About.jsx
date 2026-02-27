export default function About() {
  return (
    <section className="bg-[#F8FBFF] py-24 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <img
          src="https://i.pinimg.com/1200x/1b/8e/b1/1b8eb1a48b9c047ddfc1d149b4c7f809.jpg"
          className="rounded-xl shadow-xl"
        />

        <div>
          <p className="text-[#4B8BBE] mb-3 font-semibold">About Platform</p>

          <h2 className="text-4xl font-bold mb-6 text-[#001F3F]">
            Transparent Public Infrastructure Monitoring
          </h2>

          <p className="text-gray-600 mb-6">
            e-Nirikshan empowers citizens to track infrastructure projects in
            real time. Monitor progress, identify delays, and ensure
            accountability.
          </p>

          <button
            className="
            bg-[#0A4D92]
            text-white
            px-6 py-3
            rounded-lg
            hover:bg-[#1B6F9A]
          "
          >
            Explore Projects
          </button>
        </div>
      </div>
    </section>
  );
}
