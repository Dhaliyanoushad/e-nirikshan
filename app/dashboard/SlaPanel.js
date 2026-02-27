export default function SlaPanel() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">SLA Breach Monitoring</h2>

      <div className="space-y-4">
       <div className="text-yellow-600 font-medium">
        Delayed {'>'} 30 Days: 320 Projects
        </div>

        <div className="text-orange-600 font-medium">
        Delayed {'>'} 60 Days: 180 Projects
        </div>

        <div className="text-red-600 font-medium">
        Delayed {'>'} 90 Days: 75 Projects
        </div>
      </div>
    </div>
  );
}