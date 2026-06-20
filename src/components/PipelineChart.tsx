"use client";

import {

  PieChart,

  Pie,

  Cell,

  ResponsiveContainer,

} from "recharts";

export default function PipelineChart({

  data,

}: {

  data:any[];

}) {

  if (!data.length) {

    return (

      <div className="h-80 flex items-center justify-center">

        No data

      </div>

    );

  }

  return (

    <div className="w-full h-[350px]">

      <ResponsiveContainer>

        <PieChart>

          <Pie

            data={data}

            dataKey="value"

            nameKey="name"

            outerRadius={100}

          >

            <Cell fill="#60899B" />

            <Cell fill="#285C70" />

            <Cell fill="#1C3E4E" />

            <Cell fill="#4D7383" />

            <Cell fill="#88A9B7" />

          </Pie>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}