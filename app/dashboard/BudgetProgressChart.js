"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "District A", budget: 80, progress: 65 },
  { name: "District B", budget: 60, progress: 55 },
  { name: "District C", budget: 90, progress: 70 },
  { name: "District D", budget: 75, progress: 50 },
  { name: "District E", budget: 85, progress: 80 },
];

export default function BudgetProgressChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Budget vs Work Progress
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barGap={10}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* Budget Bar - Light Blue */}
          <Bar
            dataKey="budget"
            fill="#93c5fd"
            radius={[8, 8, 0, 0]}
          />

          {/* Progress Bar - Dark Blue */}
          <Bar
            dataKey="progress"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}