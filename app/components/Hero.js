export default function Hero() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl font-bold text-[#1A3263] mb-4">e-Nirikshan</h1>

      <p className="text-lg text-[#547792] mb-6">
        Monitor public projects with transparency and accountability
      </p>

      <div className="w-full max-w-xl">
        <input
          placeholder="Search Any Public Project"
          className="w-full px-5 py-3 rounded-lg border border-[#547792] focus:outline-none"
        />
      </div>
    </section>
  );
}
