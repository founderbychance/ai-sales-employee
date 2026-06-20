"use client";

import Link from "next/link";

import LeadForm from "@/components/LeadForm";

import {

  SignInButton,

  UserButton,

  useUser,

} from "@clerk/nextjs";

export default function Home() {

  const { isSignedIn } = useUser();

  return (

    <main className="min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="flex justify-between items-center mb-24">

          <div>

            <h1 className="text-4xl font-bold">

              SalesPilotAI

            </h1>

            <p className="text-gray-400 mt-2">

              Your AI Sales Employee

            </p>

          </div>

          {

            !isSignedIn ? (

              <SignInButton mode="modal">

                <button

                  className="

                  bg-[#1C3E4E]

                  hover:bg-[#285C70]

                  px-6

                  py-3

                  rounded-2xl

                  transition-all

                "

                >

                  🔐 Sign In

                </button>

              </SignInButton>

            ) : (

              <UserButton />

            )

          }

        </div>

        {/* Hero */}

        <section className="text-center mb-32">

          <div

            className="

            inline-flex

            px-5

            py-2

            rounded-full

            border

            border-[#353535]

            bg-[#111111]

            mb-8

          "

          >

            🚀 Early Access • Now Onboarding Businesses

          </div>

          <h1

className="

text-6xl

md:text-8xl

font-black

leading-tight

mb-8

bg-gradient-to-r

from-[#F2EDEA]

via-[#60899B]

to-[#285C70]

bg-clip-text

text-transparent

"

>

            Your

            <br />

            AI Sales Employee

          </h1>

          <p

            className="

            text-xl

            text-gray-400

            max-w-3xl

            mx-auto

            mb-12

          "

          >

            Capture, qualify, score and

            organize every lead automatically.

            Never lose another customer again.

          </p>

          <div

            className="

            flex

            flex-wrap

            justify-center

            gap-6

          "

          >

            {

              isSignedIn && (

                <Link

                  href="/dashboard"

                  className="

bg-[#1C3E4E]

hover:bg-[#285C70]

transition-all

duration-300

hover:-translate-y-1

hover:shadow-2xl

px-8

py-4

rounded-2xl

"

                >

                  🚀 Dashboard

                </Link>

              )

            }

            {

              isSignedIn && (

                <Link

                  href="/leads"

                  className="

border

border-[#353535]

px-8

py-4

rounded-2xl

hover:border-[#60899B]

hover:-translate-y-1

transition-all

duration-300

"

                >

                  👥 Leads

                </Link>

              )

            }

            <Link

              href="/waitlist"

              className="

border

border-[#353535]

px-8

py-4

rounded-2xl

hover:border-[#60899B]

hover:-translate-y-1

transition-all

duration-300

"

            >

              ✉️ Join Waitlist

            </Link>

          </div>

        </section>

        {/* Lead Form */}

        <section className="mb-32 flex justify-center">

          <div

            className="

            w-full

            max-w-xl

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-10

          "

          >

            <h2

              className="

text-4xl

font-black

text-center

mb-10

bg-gradient-to-r

from-[#60899B]

to-[#285C70]

bg-clip-text

text-transparent

"

            >

              🚀 Create a Lead

            </h2>

            {

              isSignedIn ? (

                <LeadForm />

              ) : (

                <div className="text-center">

                  🔐 Sign in to create leads

                </div>

              )

            }

          </div>

        </section>

        {/* Features */}

        <section

          className="

          grid

          md:grid-cols-4

          gap-8

          mb-32

        "

        >

          {
          
          [
{
icon:"🤖",
title:"AI Scoring",

text:"Score leads automatically."
},

{
icon:"📊",
title:"Analytics",

text:"Track conversions and growth."
},

{
icon:"📋",
title:"Pipeline",

text:"Manage every sales stage."
},

{
icon:"👥",
title:"Team Workspace",

text:"Collaborate with teammates."
},

{
icon:"📧",
title:"Gmail Integration",

text:"Send emails from one place."
},

{
icon:"🧠",
title:"AI Copilot",

text:"Your intelligent sales assistant."
}
]

.map((item)=>(

            <div

              key={item.title}

              className="

              bg-[#111111]

              border

              border-[#232323]

              rounded-3xl

              p-8

              hover:-translate-y-2

hover:border-[#285C70]

transition-all

duration-300

            "

            >

              <h2 className="text-3xl mb-4">

                {item.icon}

              </h2>

              <h3 className="text-2xl font-bold mb-4">

                {item.title}

              </h3>

              <p className="text-gray-400">

                {item.text}

              </p>

            </div>

          ))}

        </section>

        {/* Footer */}

        <footer

className="

border-t

border-[#232323]

pt-16

pb-10

mt-20

"

>

<div className="max-w-7xl mx-auto">

<div className="grid md:grid-cols-3 gap-10">

<div>

<h3 className="text-2xl font-bold mb-4">

SalesPilotAI

</h3>

<p className="text-gray-400">

AI-powered CRM for freelancers,

agencies and businesses.

</p>

</div>

<div>

<h4 className="font-bold mb-4">

Product

</h4>

<div className="space-y-2 text-gray-400">

<p>Dashboard</p>

<p>Leads</p>

<p>Analytics</p>

<p>Pricing</p>

</div>

</div>

<div>

<h4 className="font-bold mb-4">

Support

</h4>

<div className="space-y-2 text-gray-400">

<p>Privacy</p>

<p>Terms</p>

<p>forgegroupofficial@gmail.com</p>

</div>

</div>

</div>

<div

className="

border-t

border-[#232323]

mt-10

pt-6

text-center

text-gray-500

"

>

© {new Date().getFullYear()} SalesPilotAI

</div>

</div>

</footer>

      </div>

    </main>

  );

}