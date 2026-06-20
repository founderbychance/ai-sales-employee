import KanbanBoard from "@/components/KanbanBoard";

import { supabase } from "@/lib/supabase";

import { auth } from "@clerk/nextjs/server";

export default async function KanbanPage() {

  const { userId } = await auth();

  if (!userId) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          🔒 Please sign in

        </h1>

      </main>

    );

  }

  const { data } = await supabase

    .from("leads")

    .select("*")

    .eq("user_id", userId)

    .order("created_at", {

      ascending: false,

    });

  const leads = data ?? [];

  const stages = [

    {

      id: "new",

      title: "🟢 New",

    },

    {

      id: "contacted",

      title: "🟡 Contacted",

    },

    {

      id: "qualified",

      title: "🔵 Qualified",

    },

    {

      id: "won",

      title: "🟣 Won",

    },

    {

      id: "lost",

      title: "🔴 Lost",

    },

  ];

  return (

    <main className="min-h-screen p-6 md:p-10">

      {/* Header */}

      <div className="mb-12">

        <p className="text-[#60899B]">

          Sales Pipeline

        </p>

        <h1

className="

text-5xl

font-black

bg-gradient-to-r

from-[#F2EDEA]

via-[#60899B]

to-[#285C70]

bg-clip-text

text-transparent

"

>

          📋 Kanban Board

        </h1>

      </div>

      <KanbanBoard

stages={stages}

leads={leads}

/>


    </main>

  );

}