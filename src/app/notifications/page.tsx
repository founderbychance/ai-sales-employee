import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function NotificationsPage() {

  const { userId } = await auth();

  if (!userId) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h1>🔒 Please sign in</h1>

      </main>

    );

  }

  const { data } = await supabase

    .from("notifications")

    .select("*")

    .eq("user_id", userId)

    .order("created_at", {

      ascending: false,

    });

  const notifications = data || [];

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        <p className="text-[#60899B]">

          Activity Center

        </p>

        <h1 className="text-5xl font-black mb-10">

          🔔 Notifications

        </h1>

        <div className="space-y-6">

          {

            notifications.length === 0

            ? (

              <div className="bg-[#111111] border border-[#232323] rounded-3xl p-10 text-center">

                No notifications

              </div>

            )

            : (

              notifications.map(

                (item:any)=>(

                  <div

                    key={item.id}

                    className="bg-[#111111] border border-[#232323] rounded-3xl p-8"

                  >

                    <h2 className="text-2xl font-bold">

                      {item.title}

                    </h2>

                    <p className="mt-4">

                      {item.message}

                    </p>

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