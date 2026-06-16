"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LeadsChart({
  data,
}: {
  data: any[];
}) {

  return (

    <div className="h-80">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="ai_score" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}