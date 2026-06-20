import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function GmailPage() { 

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

const { data: connection } =

  await supabase

    .from("gmail_connections")

    .select("*")

    .eq(

      "user_id",

      userId

    )

    .single();

const isConnected =

  !!connection;

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-[#60899B]">

          Integrations

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

          📧 Gmail Integration

        </h1>

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-10

        "

        >

          <h2

            className="

            text-3xl

            font-bold

            mb-6

          "

          >

            Connect Company Gmail

          </h2>

          <p className="text-gray-400 mb-8">

            Connect your Gmail account

            to send emails directly

            from SalesPilotAI.

          </p>

          <div

  className="

  mb-8

  bg-[#0A0F14]

  border

  border-[#232323]

  rounded-2xl

  p-5

"

>

  {

    isConnected

    ? (

      <p>

        🟢 Connected:

        {" "}

        {connection.email}

      </p>

    )

    : (

      <p>

        🔴 Gmail not connected

      </p>

    )

  }

</div>

          {

!isConnected && (

<Link

  href="/api/gmail/connect"

  className="

  bg-[#1C3E4E]

  hover:bg-[#285C70]

  px-6

  py-4

  rounded-2xl

  transition-all

"

>

  🔗 Connect Gmail

</Link>

)

}

          <div

  className="

  mt-8

  bg-[#0A0F14]

  border

  border-[#232323]

  rounded-2xl

  p-6

"

>

  <h3

    className="

    text-2xl

    font-bold

    mb-4

  "

  >

    Workflow

  </h3>

  <div className="space-y-3">

    <p>

      1️⃣ Connect Gmail

    </p>

    <p>

      2️⃣ Generate AI Email

    </p>

    <p>

      3️⃣ Send Email

    </p>

    <p>

      4️⃣ Save History

    </p>

  </div>

</div>

        </div>

      </div>

    </main>

  );

}