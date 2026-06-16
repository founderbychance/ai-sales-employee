import { supabase } from "@/lib/supabase";

export default async function Dashboard() {

  const { data } = await supabase
    .from("leads")
    .select("*");

  const totalLeads = data?.length ?? 0;

  const newLeads =
    data?.filter(
      (lead) => lead.status === "new"
    ).length ?? 0;

  const averageScore =
    data && data.length
      ? Math.round(

          data.reduce(

            (sum, lead) =>

              sum + (lead.ai_score || 0),

            0

          ) / data.length

        )
      : 0;

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">

        📊 Dashboard

      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-8 shadow-sm">

          <p className="text-gray-500">

            Total Leads

          </p>

          <h2 className="text-5xl font-bold mt-4">

            {totalLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-8 shadow-sm">

          <p className="text-gray-500">

            New Leads

          </p>

          <h2 className="text-5xl font-bold mt-4">

            {newLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-8 shadow-sm">

          <p className="text-gray-500">

            Average AI Score

          </p>

          <h2 className="text-5xl font-bold mt-4">

            {averageScore}/10

          </h2>

        </div>

      </div>

    </main>

  );

}