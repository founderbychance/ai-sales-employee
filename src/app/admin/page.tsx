import { auth, currentUser } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function AdminPage() {

  const { userId } = await auth();

  if (!userId) {

    return (

      <main className="min-h-screen p-10 flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          🔒 Please sign in

        </h1>

      </main>

    );

  }

  const user = await currentUser();

  const email =

    user?.emailAddresses?.[0]

      ?.emailAddress;

  const adminEmail =

    "forgegroupofficial@gmail.com";

  if (email !== adminEmail) {

    return (

      <main className="min-h-screen p-10 flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          ⛔ Access Denied

        </h1>

      </main>

    );

  }

  const { data } = await supabase

    .from("waitlist")

    .select("*")

    .order(

      "created_at",

      {

        ascending: false,

      }

    );

  const users = data || [];

  return (

    <main className="min-h-screen p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">

          📋 Waitlist Admin

        </h1>

        <p className="text-gray-500 mb-10">

          Potential customers interested in LeadsHijack AI.

        </p>

        {users.length === 0 ? (

          <div className="border rounded-xl p-10 text-center">

            No waitlist users yet.

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead>

                <tr className="border-b">

                  <th className="p-4 text-left">

                    Name

                  </th>

                  <th className="p-4 text-left">

                    Email

                  </th>

                  <th className="p-4 text-left">

                    Business

                  </th>

                  <th className="p-4 text-left">

                    Joined

                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((user: any) => (

                  <tr

                    key={user.id}

                    className="border-b"

                  >

                    <td className="p-4">

                      {user.name}

                    </td>

                    <td className="p-4">

                      {user.email}

                    </td>

                    <td className="p-4">

                      {user.business}

                    </td>

                    <td className="p-4">

                      {new Date(

                        user.created_at

                      ).toLocaleDateString()}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </main>

  );

}