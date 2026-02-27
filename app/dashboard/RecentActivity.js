export default function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

      <ul className="space-y-3 text-sm text-gray-600">
        <li>Bridge Project #2026-12 updated to 54%</li>
        <li>Road Project #2026-07 marked delayed (32 days)</li>
        <li>Budget revision logged for Drainage Project</li>
      </ul>
    </div>
  );
}