import Link from "next/link";

export default function WhatsAppPage() {

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

          💬 WhatsApp

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

            WhatsApp Messaging

          </h2>

          <p className="text-gray-400 mb-8">

            Open WhatsApp instantly for any lead.

          </p>

          <div className="space-y-3">

            <p>

              ✅ Open WhatsApp

            </p>

            <p>

              ✅ Generate AI message

            </p>

            <p>

              ✅ Track follow-ups

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}