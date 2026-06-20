import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

import Link from "next/link";

export default async function TeamPage() {

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

    .from("team_members")

    .select("*")

    .eq("owner_id", userId);

  const members = data || [];

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-[#60899B]">

              Workspace

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

              👥 Team Members

            </h1>

          </div>

          <Link

            href="/invite"

            className="

            bg-[#1C3E4E]

            hover:bg-[#285C70]

            px-5

            py-3

            rounded-2xl

            transition-all

            duration-300

          "

          >

            ➕ Invite Member

          </Link>

        </div>

        <div className="mb-10">

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-6

          "

          >

            <p className="text-gray-400">

              Total Members

            </p>

            <h2 className="text-5xl font-bold mt-4">

              {members.length}

            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {

            members.length === 0

            ? (

              <div

                className="

                col-span-3

                bg-[#111111]

                border

                border-[#232323]

                rounded-3xl

                p-10

                text-center

              "

              >

                <h2 className="text-3xl font-bold">

                  No Team Members

                </h2>

                <p className="mt-4 text-gray-400">

                  Invite your first teammate.

                </p>

              </div>

            )

            : (

              members.map(

                (member:any)=>(

                  <div

                    key={member.id}

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

                      {member.name}

                    </h2>

                    <p className="mt-4">

                      📧 {member.email}

                    </p>

                    <div className="mt-6">

                      <span

                        className="

                        bg-[#1C3E4E]

                        px-4

                        py-2

                        rounded-full

                        text-sm

                      "

                      >

                        🛡️ {member.role}

                      </span>

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