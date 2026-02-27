"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", expected: 20, actual: 15 },
  { month: "Feb", expected: 40, actual: 35 },
  { month: "Mar", expected: 60, actual: 50 },
  { month: "Apr", expected: 80, actual: 65 },
];

export default function ProgressChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Expected vs Actual Progress
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="expected" stroke="#2563eb" />
          <Line type="monotone" dataKey="actual" stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}