import { auth } from "@clerk/nextjs/server";

import { supabase }

from "@/lib/supabase";

import EmailGenerator

from "@/components/EmailGenerator";

export default async function

EmailGeneratorPage() {

  const { userId }

  = await auth();

  if (!userId) {

    return (

      <main

      className="

      min-h-screen

      flex

      items-center

      justify-center

      ">

        <h1>

          🔒 Please sign in

        </h1>

      </main>

    );

  }

  const { data }

  = await supabase

  .from("leads")

  .select("*")

  .eq(

    "user_id",

    userId

  )

  .order(

    "created_at",

    {

      ascending:false,

    }

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

          📧 AI Email Generator

        </h1>

        <EmailGenerator

          leads={data || []}

        />

      </div>

    </main>

  );

}