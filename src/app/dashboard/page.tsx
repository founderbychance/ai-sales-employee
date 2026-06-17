import { supabase } from "@/lib/supabase";

import LeadsChart from "@/components/LeadsChart";

export default async function Dashboard() {

  const { data } = await supabase

    .from("leads")

    .select("*");

  const leads = data || [];

  const totalLeads = leads.length;

  const leadLimit = 5;

  const remainingLeads = Math.max(

    0,

    leadLimit - totalLeads

  );

  const newLeads = leads.filter(

    (lead) => lead.stage === "new"

  ).length;

  const contactedLeads = leads.filter(

    (lead) => lead.stage === "contacted"

  ).length;

  const qualifiedLeads = leads.filter(

    (lead) => lead.stage === "qualified"

  ).length;

  const wonLeads = leads.filter(

    (lead) => lead.stage === "won"

  ).length;

  const lostLeads = leads.filter(

    (lead) => lead.stage === "lost"

  ).length;

  const recentLeads = [...leads]

    .sort(

      (a, b) =>

        new Date(

          b.created_at

        ).getTime()

        -

        new Date(

          a.created_at

        ).getTime()

    )

    .slice(0, 5);

  const averageScore = totalLeads

    ? Math.round(

        leads.reduce(

          (sum, lead) =>

            sum +

            (lead.ai_score || 0),

          0

        ) / totalLeads

      )

    : 0;

  const bestLead = leads.length

    ? leads.reduce(

        (best, current) =>

          current.ai_score >

          best.ai_score

            ? current

            : best

      )

    : null;

  return (

    <main className="min-h-screen p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">

          📊 Dashboard

        </h1>

        <div className="flex gap-4">

          <a

            href="/"

            className="border px-4 py-2 rounded"

          >

            ➕ Add Lead

          </a>

          <a

            href="/leads"

            className="border px-4 py-2 rounded"

          >

            👥 Leads

          </a>

          <a

            href="/kanban"

            className="border px-4 py-2 rounded"

          >

            📋 Kanban

          </a>

        </div>

      </div>

      {/* Usage Counter */}

      <div className="border rounded-xl p-8 mb-8">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">

              📦 Free Plan

            </h2>

            <p className="text-gray-500 mt-2">

              {totalLeads} / {leadLimit}

              {" "}leads used

            </p>

            <p className="mt-2">

              {remainingLeads}

              {" "}leads remaining

            </p>

          </div>

          <a

            href="/upgrade"

            className="border px-6 py-3 rounded"

          >

            🚀 Upgrade

          </a>

        </div>

      </div>

      {/* Main Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="border rounded-xl p-8 shadow">

          <p className="text-gray-500">

            Total Leads

          </p>

          <h2 className="text-5xl font-bold mt-4">

            {totalLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-8 shadow">

          <p className="text-gray-500">

            New Leads

          </p>

          <h2 className="text-5xl font-bold mt-4">

            {newLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-8 shadow">

          <p className="text-gray-500">

            Average AI Score

          </p>

          <h2 className="text-5xl font-bold mt-4">

            {averageScore}/10

          </h2>

        </div>

        <div className="border rounded-xl p-8 shadow">

          <p className="text-gray-500">

            🥇 Best Lead

          </p>

          <h2 className="text-2xl font-bold mt-4">

            {

              bestLead

                ? bestLead.name

                : "No Leads"

            }

          </h2>

        </div>

      </div>

      {/* Pipeline */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="border rounded-xl p-6">

          <p>

            🟡 Contacted

          </p>

          <h2 className="text-4xl font-bold">

            {contactedLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-6">

          <p>

            🔵 Qualified

          </p>

          <h2 className="text-4xl font-bold">

            {qualifiedLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-6">

          <p>

            🟣 Won

          </p>

          <h2 className="text-4xl font-bold">

            {wonLeads}

          </h2>

        </div>

        <div className="border rounded-xl p-6">

          <p>

            🔴 Lost

          </p>

          <h2 className="text-4xl font-bold">

            {lostLeads}

          </h2>

        </div>

      </div>

      {/* Chart + Recent Activity */}

      <div className="grid md:grid-cols-2 gap-8 mt-12">

        <div className="border rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            📈 AI Scores

          </h2>

          <LeadsChart data={leads} />

        </div>

        <div className="border rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            🕒 Recent Activity

          </h2>

          <div className="space-y-4">

            {recentLeads.map(

              (lead) => (

                <div

                  key={lead.id}

                  className="border-b pb-3"

                >

                  <p className="font-bold">

                    {lead.name}

                  </p>

                  <p>

                    🏢 {lead.company}

                  </p>

                  <p>

                    🟢 {lead.stage}

                  </p>

                </div>

              )

            )}

          </div>

        </div>

      </div>

    </main>

  );

}