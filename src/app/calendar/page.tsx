import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function CalendarPage() {

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

    .not("follow_up_date", "is", null)

    .order("follow_up_date", {

      ascending: true,

    });

  const reminders = data || [];

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        <p className="text-[#60899B]">

          Follow Ups

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

          📅 Calendar

        </h1>

        <div className="space-y-6">

          {

            reminders.length === 0

            ? (

              <div className="bg-[#111111] border border-[#232323] rounded-3xl p-10 text-center">

                No reminders scheduled

              </div>

            )

            : (

              reminders.map((lead:any)=>(

                <div

                  key={lead.id}

                  className="bg-[#111111] border border-[#232323] rounded-3xl p-8"

                >

                  <h2 className="text-2xl font-bold">

                    {lead.name}

                  </h2>

                  <p className="mt-3">

                    🏢 {lead.company}

                  </p>

                  <p>

                    📅 {lead.follow_up_date}

                  </p>

                  <p>

                    📝 {lead.follow_up_note || "No note"}

                  </p>

                </div>

              ))

            )

          }

        </div>

      </div>

    </main>

  );

}