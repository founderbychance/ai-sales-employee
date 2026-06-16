import { supabase } from "@/lib/supabase";

export default async function Dashboard() {

  const { data } = await supabase
    .from("leads")
    .select("*");

  const leads = data || [];

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "new"
  ).length;

  const averageScore = totalLeads
    ? Math.round(
        leads.reduce(
          (sum, lead) =>
            sum + (lead.ai_score || 0),
          0
        ) / totalLeads
      )
    : 0;

  const bestLead = leads.length
    ? leads.reduce((best, current) =>
        current.ai_score > best.ai_score
          ? current
          : best
      )
    : null;

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">

        📊 Dashboard

      </h1>

      <div className="grid md:grid-cols-4 gap-6">

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

        <div className="border rounded-xl p-8 shadow-sm">

          <p className="text-gray-500">

            🥇 Best Lead

          </p>

          <h2 className="text-2xl font-bold mt-4">

            {bestLead
              ? bestLead.name
              : "No Leads"}

          </h2>

        </div>

      </div>

    </main>

  );

}