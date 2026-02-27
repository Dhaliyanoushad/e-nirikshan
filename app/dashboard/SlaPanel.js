export default function SlaPanel() {

  const slaData = [
    {
      label: "Delayed > 30 Days",
      count: 320,
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      label: "Delayed > 60 Days",
      count: 180,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      label: "Delayed > 90 Days",
      count: 75,
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      
      <h2 className="text-xl font-semibold mb-5">
        🚨 SLA Breach Monitoring
      </h2>

      <div className="space-y-4">
        {slaData.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 rounded-lg ${item.bg}`}
          >
            <span className={`font-medium ${item.color}`}>
              {item.label}
            </span>

            <span className="text-lg font-bold">
              {item.count}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}