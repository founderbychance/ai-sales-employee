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

        <BarChart

  data={[...data].sort(

    (a, b) =>

      b.ai_score - a.ai_score

  )}

>

          <XAxis

  dataKey="name"

  angle={-30}

  textAnchor="end"

  interval={0}

  height={80}

/>

          <YAxis />

          <Tooltip

  formatter={(value) => [

    `${value}/10`,

    "AI Score",

  ]}

/>

          <Bar dataKey="ai_score" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}