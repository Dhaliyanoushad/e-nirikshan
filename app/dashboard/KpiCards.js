export default function KpiCards() {
  const data = [
    { title: "Total Projects", value: "12,540" },
    { title: "Active Projects", value: "8,210" },
    { title: "Delayed Projects", value: "1,430" },
    { title: "Budget Utilization", value: "74%" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-xl p-6 text-center"
        >
          <h2 className="text-2xl font-bold">{item.value}</h2>
          <p className="text-gray-500 mt-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
}