import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function AIBriefingPage() {

  const { userId } = await auth();

  if (!userId) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h1>

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

  const highPriority = leads.filter(

    (lead) =>

      lead.priority === "high"

  );

  const risky = leads.filter(

    (lead) =>

      (lead.ai_score || 0) <= 3

  );

  const favorites = leads.filter(

    (lead) =>

      lead.is_favorite

  );

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-[#60899B]">

          AI Employee

        </p>

        <h1

          className="

          text-5xl

          font-black

          mb-10

        "

        >

          🧠 Daily AI Briefing

        </h1>

        <div className="space-y-8">

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

          "

          >

            <h2 className="text-2xl font-bold mb-4">

              🔥 High Priority

            </h2>

            <p>

              {highPriority.length}

              {" "}urgent leads

            </p>

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

            <h2 className="text-2xl font-bold mb-4">

              ⚠️ Risky Leads

            </h2>

            <p>

              {risky.length}

              {" "}need attention

            </p>

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

            <h2 className="text-2xl font-bold mb-4">

              ⭐ Favorites

            </h2>

            <p>

              {favorites.length}

              {" "}important leads

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}