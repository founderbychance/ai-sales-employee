import { auth } from "@clerk/nextjs/server";

export default async function GoalsPage() {

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

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-[#60899B]">

          Performance

        </p>

        <h1

          className="

          text-5xl

          font-black

          mb-10

        "

        >

          🎯 Goals & Targets

        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

          "

          >

            <p>Monthly Leads</p>

            <h2 className="text-5xl font-bold mt-4">

              100

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

            <p>Monthly Deals</p>

            <h2 className="text-5xl font-bold mt-4">

              25

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

            <p>Revenue Goal</p>

            <h2 className="text-5xl font-bold mt-4">

              ₹1L

            </h2>

          </div>

        </div>

      </div>

    </main>

  );

}