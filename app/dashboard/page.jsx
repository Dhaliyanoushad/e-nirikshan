import KpiCards from "./KpiCards";
import ProgressChart from "./ProgressChart";
import SlaPanel from "./SlaPanel";
import BudgetProgressChart from "./BudgetProgressChart";
import DistrictMap from "./DistrictMap";
import RecentActivity from "./RecentActivity";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">

      <h1 className="text-3xl font-bold">State Monitoring Dashboard</h1>

      {/* KPI Section */}
      <KpiCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <BudgetProgressChart />
      </div>

      {/* Map + SLA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistrictMap />
        <SlaPanel />
      </div>

      {/* Activity Feed */}
      <RecentActivity />

    </div>
  );
}