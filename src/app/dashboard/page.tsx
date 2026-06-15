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

      <h1 className="text-4xl font-bold">

        Dashboard

      </h1>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="border p-6 rounded-xl">

          <h2>Total Leads</h2>

          <p className="text-4xl">

            {totalLeads}

          </p>

        </div>

        <div className="border p-6 rounded-xl">

          <h2>New Leads</h2>

          <p className="text-4xl">

            {newLeads}

          </p>

        </div>

        <div className="border p-6 rounded-xl">

          <h2>Average AI Score</h2>

          <p className="text-4xl">

            {averageScore}

          </p>

        </div>

      </div>

    </main>
  );
}