import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function LeadsPage() {

  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">

        Leads

      </h1>

      <div className="space-y-4">

        {data?.map((lead) => (

          <Link
            key={lead.id}
            href={`/leads/${lead.id}`}
          >

            <div
              className="border p-4 rounded-lg space-y-2 hover:bg-gray-100 cursor-pointer"
            >

              <h2 className="font-bold text-xl">

                {lead.name}

              </h2>

              <p>

📧 {lead.email}

              </p>

              <p>

🏢 {lead.company}

              </p>

              <p>

🟢 Status: {lead.status}

              </p>

              <p>

🤖 AI Score: {lead.ai_score}/10

              </p>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );
}