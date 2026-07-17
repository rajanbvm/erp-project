"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Leads", value: 1248 },
  { name: "Contacted", value: 902 },
  { name: "Proposal", value: 352 },
  { name: "Qualified", value: 600 },
];

const COLORS = [
  "#222222",
  "#22C55E",
  "#F97316",
  "#FBBF24",
];

export default function SalesFunnel() {
  return (
    <div className="SalesFunnelChart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}