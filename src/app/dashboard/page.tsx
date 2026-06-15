import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { data } = await supabase
    .from("leads")
    .select("*");

  const totalLeads = data?.length ?? 0;

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold">

        Dashboard

      </h1>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="border rounded-xl p-6">

          <h2 className="font-semibold">

            Total Leads

          </h2>

          <p className="text-4xl mt-4">

            {totalLeads}

          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2 className="font-semibold">

            Meetings Booked

          </h2>

          <p className="text-4xl mt-4">

            0

          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2 className="font-semibold">

            AI Conversations

          </h2>

          <p className="text-4xl mt-4">

            0

          </p>

        </div>

      </div>

    </main>
  );
}