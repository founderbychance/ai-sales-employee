import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function WorkspacePage() {

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

    .from("workspaces")

    .select("*")

    .eq("owner_id", userId)

    .single();

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-[#60899B]">

          Organization

        </p>

        <h1

          className="

          text-5xl

          font-black

          mb-10

          bg-gradient-to-r

          from-[#F2EDEA]

          via-[#60899B]

          to-[#285C70]

          bg-clip-text

          text-transparent

        "

        >

          🏢 Workspace

        </h1>

        {

          !data

          ? (

            <div

              className="

              bg-[#111111]

              border

              border-[#232323]

              rounded-3xl

              p-10

              text-center

            "

            >

              <h2 className="text-3xl font-bold">

                No Workspace Found

              </h2>

              <p className="mt-4 text-gray-400">

                Create your workspace

                to unlock team

                collaboration.

              </p>

            </div>

          )

          : (

            <div

              className="

              bg-[#111111]

              border

              border-[#232323]

              rounded-3xl

              p-8

            "

            >

              <h2 className="text-4xl font-bold">

                {data.name}

              </h2>

              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div>

                  <p className="text-gray-400">

                    Workspace Type

                  </p>

                  <h3 className="text-2xl mt-2">

                    {data.type || "-"}

                  </h3>

                </div>

                <div>

                  <p className="text-gray-400">

                    Plan

                  </p>

                  <h3 className="text-2xl mt-2">

                    {

                      (data.plan || "free")

                      .toUpperCase()

                    }

                  </h3>

                </div>

                <div>

                  <p className="text-gray-400">

                    Owner

                  </p>

                  <h3 className="text-2xl mt-2">

                    {userId}

                  </h3>

                </div>

                <div>

                  <p className="text-gray-400">

                    Created

                  </p>

                  <h3 className="text-2xl mt-2">

                    {

                      data.created_at

                      ?

                      new Date(

                        data.created_at

                      )

                      .toLocaleDateString()

                      :

                      "-"

                    }

                  </h3>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </main>

  );

}