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

  const leads = data || [];

  const stages = [

    "new",

    "contacted",

    "qualified",

    "won",

    "lost",

  ];

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">

        📋 Kanban Board

      </h1>

      <div className="grid md:grid-cols-5 gap-6">

        {stages.map((stage) => (

          <div

            key={stage}

            className="border rounded-xl p-4"

          >

            <h2 className="font-bold text-xl mb-4 capitalize">

              {stage}

            </h2>

            <div className="space-y-3">

              {leads

                .filter(

                  (lead) =>

                    lead.stage === stage

                )

                .map((lead) => (

                  <div

                    key={lead.id}

                    className="border rounded-lg p-3"

                  >

                    <h3 className="font-bold">

                      {lead.name}

                    </h3>

                    <p>

🏢 {lead.company}

                    </p>

                    <p>

🤖 {lead.ai_score ?? 0}/10

</p>

                  </div>

                ))}

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}