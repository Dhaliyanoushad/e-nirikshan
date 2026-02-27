"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  { month: "Jan", expected: 10, actual: 8 },
  { month: "Feb", expected: 30, actual: 27 },
  { month: "Mar", expected: 15, actual: 12 },
  { month: "Apr", expected: 35, actual: 28 },
  { month: "May", expected: 61, actual: 45 },
  { month: "Jun", expected: 25, actual: 15 },
  { month: "Jul", expected: 87, actual: 55 },
];

export default function ProgressChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-[#17513E]">
        Expected vs Actual Progress
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          
          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* AXIS */}
          <XAxis dataKey="month" />
          <YAxis />

          {/* TOOLTIP */}
          <Tooltip />

          {/* EXPECTED LINE */}
          <Line
            type="monotone"
            dataKey="expected"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              dataKey="expected"
              position="top"
              formatter={(value) => `${value}%`}
            />
          </Line>

          {/* ACTUAL LINE */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}