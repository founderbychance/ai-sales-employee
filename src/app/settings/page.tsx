import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function SettingsPage() {

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

  const { data: profile } = await supabase

    .from("profiles")

    .select("*")

    .eq("user_id", userId)

    .single();

  const isPro =

    profile?.plan === "pro";

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="mb-12">

          <p className="text-[#60899B]">

            Account Preferences

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

            ⚙️ Settings

          </h1>

        </div>

        <div className="space-y-8">

          {/* Account */}

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

            hover:border-[#285C70]

transition-all

duration-300

hover:-translate-y-1

          "

          >

            <h2 className="text-3xl font-bold mb-4">

              👤 Account

            </h2>

            <p className="text-gray-400">

              Manage your SalesPilotAI account.

            </p>

          </div>

          {/* Plan */}

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

            hover:border-[#285C70]

transition-all

duration-300

hover:-translate-y-1

          "

          >

            <h2 className="text-3xl font-bold mb-6">

              📦 Current Plan

            </h2>

            <div className="flex justify-between items-center">

              <div>

                <p className="text-3xl font-bold">

                  {(profile?.plan || "free").toUpperCase()}

                </p>

                <p className="text-gray-400 mt-3">

                  {profile?.lead_limit || 5}

                  {" "}lead limit

                </p>

              </div>

              {

                isPro && (

                  <span

                    className="

                    bg-[#1C3E4E]

text-[#F2EDEA]

font-bold

px-5

py-2

rounded-full

                  "

                  >

                    ⭐ PRO

                  </span>

                )

              }

            </div>

          </div>

          {/* Upgrade */}

          {

            !isPro && (

              <div

                className="

                bg-[#111111]

                border

                border-[#232323]

                rounded-3xl

                p-8

                hover:border-[#285C70]

transition-all

duration-300

hover:-translate-y-1

              "

              >

                <h2 className="text-3xl font-bold mb-6">

                  🚀 Upgrade

                </h2>

                <Link

                  href="/upgrade"

                  className="

                  bg-[#1C3E4E]

hover:bg-[#285C70]

hover:-translate-y-1

hover:shadow-2xl

transition-all

duration-300

px-8

py-4

rounded-2xl

inline-block

                "

                >

                  View Plans

                </Link>

              </div>

            )

          }

          {/* System */}

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

            hover:border-[#285C70]

transition-all

duration-300

hover:-translate-y-1

          "

          >

            <h2 className="text-3xl font-bold mb-6">

              🛡️ System

            </h2>

            <div className="space-y-3">

              <p>

                🟢 Clerk Authentication

              </p>

              <p>

                🟢 Supabase Connected

              </p>

              <p>

                🟢 AI Lead Scoring Enabled

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}