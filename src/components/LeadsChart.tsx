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

  if (!data?.length) {

    return (

      <div className="h-80 flex items-center justify-center">

        <p className="text-gray-500">

          No lead data available.

        </p>

      </div>

    );

  }

  return (

    <div className="w-full h-[400px] min-h-[400px]">

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