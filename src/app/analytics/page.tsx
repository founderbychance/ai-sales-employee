import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function AnalyticsPage() {

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

    .eq("user_id", userId);

  const leads = data || [];

  const total = leads.length;

  const thisMonth = new Date();

const monthlyLeads = leads.filter(

  (lead) => {

    const date = new Date(

      lead.created_at

    );

    return (

      date.getMonth() ===

      thisMonth.getMonth()

      &&

      date.getFullYear() ===

      thisMonth.getFullYear()

    );

  }

).length;

const bestLead =

  leads.length

  ? leads.reduce(

      (best, current) =>

        (current.ai_score || 0)

        >

        (best.ai_score || 0)

        ? current

        : best

    )

  : null;

  const won = leads.filter(

    (lead) => lead.stage === "won"

  ).length;

  const lost = leads.filter(

    (lead) => lead.stage === "lost"

  ).length;

  const conversion = total

  ? Math.round(

      (won / total) * 100

    )

  : 0;

const avgScore = total

  ? Math.round(

      leads.reduce(

        (sum, lead) =>

          sum + (lead.ai_score || 0),

        0

      ) / total

    )

  : 0;

const salesHealth = Math.round(

  (

    avgScore * 0.6

    +

    conversion * 0.4

  )

);

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-[#60899B]">

          Business Insights

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

          mb-10

        "

        >

          📈 Analytics

        </h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

          <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

            <p>Total Leads</p>

            <h2 className="text-5xl font-bold mt-4">

              {total}

            </h2>

          </div>

          <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

  <p>Monthly Leads</p>

  <h2 className="text-5xl font-bold mt-4">

    {monthlyLeads}

  </h2>

</div>

          <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

            <p>Won Deals</p>

            <h2 className="text-5xl font-bold mt-4">

              {won}

            </h2>

          </div>

          <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

            <p>Lost Deals</p>

            <h2 className="text-5xl font-bold mt-4">

              {lost}

            </h2>

          </div>

          <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

  <p>Best Lead</p>

  <h2 className="text-3xl font-bold mt-4">

    {

      bestLead

      ? bestLead.name

      : "-"

    }

  </h2>

</div>

          <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

            <p>Average AI Score</p>

            <h2

className={`

text-5xl

font-bold

mt-4

${

avgScore >= 7

? "text-green-400"

: avgScore >= 4

? "text-yellow-400"

: "text-red-400"

}

`}

>

{avgScore}/10

</h2>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">

  <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

    <p>Conversion Rate</p>

    <h2 className="text-5xl font-bold mt-4">

      {conversion}%

    </h2>

  </div>

  <div className="bg-[#111111] border border-[#232323] rounded-3xl p-8">

    <p>Sales Health</p>

    <h2 className="text-5xl font-bold mt-4">

      {salesHealth}

    </h2>

  </div>

</div>

      </div>

    </main>

  );

}