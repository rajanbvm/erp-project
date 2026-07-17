"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    //YAxis,
    Tooltip,
} from "recharts";

const data = [
    { month: "Jan", revenue: 18 },
    { month: "Feb", revenue: 42 },
    { month: "Mar", revenue: 30 },
    { month: "Apr", revenue: 20 },
    { month: "May", revenue: 28 },
    { month: "Jun", revenue: 47 },
    { month: "Jul", revenue: 25 },
    { month: "Aug", revenue: 42 },
    { month: "Sep", revenue: 12 },
    { month: "Oct", revenue: 34 },
    { month: "Nov", revenue: 19 },
    { month: "Dec", revenue: 30 },
];

export default function RevenueChart() {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        background: "#000",
                        padding: "8px 12px",
                        borderRadius: "8px",
                    }}
                >
                    <p style={{ margin: 0, color: "#fff" }}>
                        {payload[0].value}
                    </p>
                </div>
            );
        }

        return null;
    };


    return (
        <div className="RevenueChart">
            <h4>$112,340</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="month" axisLine={false}
                        tickLine={false} />
                    {/* <YAxis /> */}
                    <Tooltip
                        cursor={false}
                        content={<CustomTooltip />}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="#E6E8F0"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}