import AICopilot from "@/components/AICopilot";

import { supabase } from "@/lib/supabase";

import LeadsChart from "@/components/LeadsChart";

import { auth } from "@clerk/nextjs/server";

import Link from "next/link";

import { redirect }

from "next/navigation";

export default async function Dashboard() {

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

  const { data: profile } = await supabase

    .from("profiles")

    .select("*")

    .eq("user_id", userId)

    .single();

    const { data: workspace } =

    

  await supabase

    .from("workspaces")

    .select("*")

    .eq(

      "owner_id",

      userId

    )

    .single();

    if (!workspace) {

  redirect(

    "/workspace-onboarding"

  );

}

  const isPro =

    profile?.plan === "pro";

  const leads = data || [];

  const totalLeads = leads.length;

  const leadLimit =

    profile?.lead_limit || 5;

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

  const estimatedDealValue = 10000;

const estimatedRevenue =

  wonLeads *

  estimatedDealValue;

  const lostLeads = leads.filter(

    (lead) => lead.stage === "lost"

  ).length;

  const favoriteLeads = leads.filter(

    (lead) => lead.is_favorite

  ).length;

  const highPriorityLeads = leads.filter(

    (lead) =>

      lead.priority === "high"

  ).length;

  const upcomingFollowUps = leads.filter(

  (lead) =>

    lead.follow_up_date

).length;

const todayTasks = [];

for (const lead of leads) {

  if (lead.priority === "high") {

    todayTasks.push(

      `⭐ Prioritize ${lead.name}`

    );

  }

  if (lead.follow_up_date) {

    todayTasks.push(

      `📅 Follow up with ${lead.company}`

    );

  }

}

const tasks =

  todayTasks.slice(0, 4);

  const recommendations = [];

for (const lead of leads) {

  if ((lead.ai_score || 0) >= 8) {

    recommendations.push(

      `🔥 Contact ${lead.company}`

    );

  }

  else if (

    (lead.ai_score || 0) >= 5

  ) {

    recommendations.push(

      `📧 Send email to ${lead.company}`

    );

  }

  if (lead.is_favorite) {

    recommendations.push(

      `⭐ ${lead.company} has high potential`

    );

  }

}

const aiRecommendations =

recommendations.slice(0,4);

const riskyLeads = leads.filter(

(lead)=>

(lead.ai_score || 0) <= 3

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

    const leadHealth =

  averageScore >= 8

    ? "🔥 Excellent"

    : averageScore >= 6

    ? "🟢 Good"

    : averageScore >= 4

    ? "🟡 Average"

    : "🔴 Poor";

  const bestLead = leads.length

    ? leads.reduce(

        (best, current) =>

          (current.ai_score || 0)

          >

          (best.ai_score || 0)

            ? current

            : best

      )

    : null;

    const hour =

  new Date()

  .getHours();

const greeting =

  hour < 12

  ? "Good Morning"

  : hour < 18

  ? "Good Afternoon"

  : "Good Evening";

  return (

    <main

className="

min-h-screen

p-6

lg:p-10

max-w-7xl

mx-auto

"

>

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-12">

        <div>

          <p className="text-[#60899B] mb-2">

            {greeting} 👋
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

            Dashboard

          </h1>

          {

            isPro && (

              <div className="mt-4">

                <span

                  className="

                  bg-[#1C3E4E]

                  px-5

                  py-2

                  rounded-full

                  text-sm

                  shadow-lg

                "

                >

                  ⭐ PRO USER

                </span>

              </div>

            )

          }

        </div>

        <div className="flex flex-wrap gap-4">

          <Link

            href="/leads"

            className="

            bg-[#1C3E4E]

            hover:bg-[#285C70]

            hover:-translate-y-1

            transition-all

            duration-300

            hover:shadow-2xl

            px-5

            py-3

            rounded-2xl

          "

          >

            ➕ Add Lead

          </Link>

          <Link

            href="/leads"

            className="

            border

            border-[#353535]

            hover:border-[#60899B]

            hover:-translate-y-1

            transition-all

            duration-300

            px-5

            py-3

            rounded-2xl

          "

          >

            👥 Leads

          </Link>

          <Link

            href="/kanban"

            className="

            border

            border-[#353535]

            hover:border-[#60899B]

            hover:-translate-y-1

            transition-all

            duration-300

            px-5

            py-3

            rounded-2xl

          "

          >

            📋 Kanban

          </Link>

        </div>

      </div>

      

      {/* Main Stats */}

      <div

className="

grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-3

gap-6

"

>

        {
        
        [

{

title:"Total Leads",

value:totalLeads

},

{

title:"⭐ Favorites",

value:favoriteLeads

},

{

title:"🔥 High Priority",

value:highPriorityLeads

},

{

title:"📅 Follow Ups",

value:upcomingFollowUps

},

{

title:"💰 Revenue",

value:`₹${estimatedRevenue}`

},

{

title:"🥇 Best Lead",

value:bestLead

? bestLead.name

: "No Leads"

}

]

.map((card)=>(

          <div

            key={card.title}

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

            hover:-translate-y-2

            hover:border-[#285C70]

            transition-all

            duration-300

          "

          >

            <p className="text-gray-400">

              {card.title}

            </p>

            <h2 className="text-4xl font-bold mt-4">

              {card.value}

            </h2>

          </div>

        ))}

      </div>

      <div

className="

grid

md:grid-cols-2

gap-8

mt-10

"

>

<div

className="

bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

"

>

<p>

📊 Lead Health

</p>

<h2

className="

text-4xl

font-bold

mt-4

"

>

{leadHealth}

</h2>

</div>

<div

className="

bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

"

>

<p>

⚠️ Risky Leads

</p>

<h2

className="

text-4xl

font-bold

mt-4

"

>

{riskyLeads}

</h2>

</div>

</div>
      {/* Pipeline */}

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        {[

          {

            icon:"🟡",

            title:"Contacted",

            value:contactedLeads

          },

          {

            icon:"🔵",

            title:"Qualified",

            value:qualifiedLeads

          },

          {

            icon:"🟣",

            title:"Won",

            value:wonLeads

          },

          {

            icon:"🔴",

            title:"Lost",

            value:lostLeads

          }

        ].map((item)=>(

          <div

            key={item.title}

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-6

            hover:border-[#60899B]

            hover:-translate-y-1

            transition-all

            duration-300

          "

          >

            <p>

              {item.icon} {item.title}

            </p>

            <h2 className="text-4xl font-bold mt-4">

              {item.value}

            </h2>

          </div>

        ))}

      </div>

      {/* AI Recommendations */}

<div

className="

bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

mt-10

"

>

<h2

className="

text-2xl

font-bold

mb-6

"

>

🤖 AI Recommendations

</h2>

<div className="space-y-4">

{

aiRecommendations.length===0

? (

<p>

No recommendations

</p>

)

:(

aiRecommendations.map(

(item,index)=>(

<div

key={index}

className="

border-b

border-[#232323]

pb-3

"

>

{item}

</div>

)

)

)

}

</div>

</div>

      <div

className="

grid

xl:grid-cols-2

gap-8

mt-10

"

>

<div>

<AICopilot
/>

</div>

<div

className="

bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

"

>

<h2

className="

text-2xl

font-bold

mb-6

"

>

📋 Today's Tasks

</h2>

<div className="space-y-4">

{

tasks.length===0

? (

<p>

🎉 No tasks today

</p>

)

:(

tasks.map(

(task,index)=>(

<div

key={index}

className="

border-b

border-[#232323]

pb-3

"

>

{task}

</div>

)

)

)

}

</div>

</div>

</div>

      {/* Chart + Recent Activity */}

      <div className="grid md:grid-cols-2 gap-8 mt-12">

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-8

        "

        >

          <h2 className="text-2xl font-bold mb-6">

            📈 AI Scores

          </h2>

          <LeadsChart data={leads} />

        </div>

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-8

        "

        >

          <h2 className="text-2xl font-bold mb-6">

            🕒 Recent Activity

          </h2>

          <div className="space-y-4">

            {

              recentLeads.length === 0

              ? (

                <p>

                  No recent activity

                </p>

              )

              : (

                recentLeads.map(

                  (lead) => (

                    <div

                      key={lead.id}

                      className="border-b border-[#232323] pb-4"

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

{

lead.follow_up_date && (

<p>

📅

{

new Date(

lead.follow_up_date

).toLocaleDateString()

}

</p>

)

}

                    </div>

                  )

                )

              )

            }

          </div>

        </div>

      </div>

      {/* Usage Counter */}

      <div

        className="

        bg-[#111111]

        border

        border-[#232323]

        rounded-3xl

        p-8

        mb-10

      "

      >

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">

          <div>

            <h2 className="text-2xl font-bold">

              📦 {(profile?.plan || "free").toUpperCase()} PLAN

            </h2>

            <p className="text-gray-400 mt-3">

              {totalLeads} / {leadLimit} leads used

            </p>

            <p className="mt-2">

              {remainingLeads} leads remaining

            </p>

          </div>

          {

            !isPro && (

              <Link

                href="/upgrade"

                className="

                bg-[#1C3E4E]

                hover:bg-[#285C70]

                hover:-translate-y-1

                transition-all

                duration-300

                hover:shadow-2xl

                px-5

                py-3

                rounded-2xl

              "

              >

                🚀 Upgrade

              </Link>

            )

          }

        </div>

      </div>

    </main>

  );

}