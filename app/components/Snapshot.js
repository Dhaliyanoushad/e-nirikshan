export default function Snapshot() {
  return (
    <section className="px-6 py-12 bg-white text-center">
      <h2 className="text-3xl font-bold text-[#1A3263] mb-8">
        National Transparency Snapshot
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-2xl font-bold text-[#FAB95B]">28</p>
          <p>States Covered</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-[#FAB95B]">18%</p>
          <p>Overall Delay</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-[#FAB95B]">82%</p>
          <p>Completion Rate</p>
        </div>
      </div>
    </section>
  );
}
