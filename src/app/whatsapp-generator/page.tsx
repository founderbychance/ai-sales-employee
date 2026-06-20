import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function WhatsAppGeneratorPage() {

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

    .eq("user_id", userId)

    .order("created_at", {

      ascending: false,

    });

  const leads = data || [];

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

          📱 WhatsApp Generator

        </h1>

        <div className="space-y-6">

          {

            leads.length === 0

            ? (

              <p>

                No leads available

              </p>

            )

            : (

              leads.map(

                (lead:any)=>(

                  <div

                    key={lead.id}

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

                    "

                    >

                      {lead.name}

                    </h2>

                    <p>

                      🏢 {lead.company}

                    </p>

                    <div

                      className="

                      mt-6

                      bg-[#0A0F14]

                      rounded-2xl

                      p-5

                    "

                    >

                      <p>

                        Hi {lead.name} 👋

                      </p>

                      <br />

                      <p>

                        I noticed {lead.company}

                        and thought we could help

                        automate your sales process.

                      </p>

                      <br />

                      <p>

                        Would you be open

                        to a quick demo call?

                      </p>

                    </div>

                  </div>

                )

              )

            )

          }

        </div>

      </div>

    </main>

  );

}