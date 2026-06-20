import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function BillingPage() {

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

  const { data: payments } = await supabase

    .from("payments")

    .select("*")

    .eq("user_id", userId)

    .order("created_at", {

      ascending: false,

    });

  const currentPlan =

  profile?.plan || "free";

const isPro =

  currentPlan !== "free";

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-12">

          <p className="text-[#60899B]">

            Subscription & Payments

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

            💳 Billing

          </h1>

        </div>

        <div className="space-y-8">

          {/* Current Plan */}

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

            hover:border-[#285C70]

hover:-translate-y-1

transition-all

duration-300

          "

          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  📦 Current Plan

                </h2>

                <p className="text-3xl font-bold">

  {currentPlan.toUpperCase()}

</p>

                <p className="text-gray-400 mt-3">

                  Lead limit:

                  {" "}

                  {profile?.lead_limit ?? 5}

                </p>

              </div>

              {

                isPro && (

                  <div

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

                  </div>

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

hover:-translate-y-1

transition-all

duration-300

              "

              >

                <h2 className="text-3xl font-bold mb-6">

                  🚀 Upgrade

                </h2>

                <div className="grid md:grid-cols-3 gap-6 mt-6">

  <div

    className="

    bg-[#1A1A1A]

    border

    border-[#353535]

    rounded-2xl

    p-6

  "

  >

    <h3 className="text-2xl font-bold">

      Freelancer

    </h3>

    <p className="text-4xl mt-4">

      ₹499

    </p>

    <p className="text-gray-400">

      /month

    </p>

  </div>

  <div

    className="

    bg-[#1A1A1A]

    border

    border-[#353535]

    rounded-2xl

    p-6

  "

  >

    <h3 className="text-2xl font-bold">

      Team

    </h3>

    <p className="text-4xl mt-4">

      ₹1499

    </p>

    <p className="text-gray-400">

      /month

    </p>

  </div>

  <div

    className="

    bg-[#1A1A1A]

    border

    border-[#353535]

    rounded-2xl

    p-6

  "

  >

    <h3 className="text-2xl font-bold">

      Business

    </h3>

    <p className="text-4xl mt-4">

      ₹3999

    </p>

    <p className="text-gray-400">

      /month

    </p>

  </div>

</div>

                <div className="flex flex-wrap gap-4">

                  <Link

                    href="/upgrade"

                    className="

                    bg-[#1C3E4E]

hover:bg-[#285C70]

hover:-translate-y-1

hover:shadow-2xl

transition-all

duration-300

px-6

py-3

rounded-2xl

                  "

                  >

                    View Plans

                  </Link>

                  <a

                    href="mailto:forgegroupofficial@gmail.com?subject=SalesPilotAI Business Plan"

                    className="

                    border

border-[#353535]

hover:border-[#60899B]

hover:-translate-y-1

transition-all

duration-300

px-6

py-3

rounded-2xl

                  "

                  >

                    📩 Contact Sales

                  </a>

                </div>

              </div>

            )

          }

          {/* Payment History */}

          <div

            className="

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-8

            hover:border-[#285C70]

hover:-translate-y-1

transition-all

duration-300

          "

          >

            <h2 className="text-3xl font-bold mb-8">

              🧾 Payment History

            </h2>

            {

              payments?.length ? (

                <div className="space-y-5">

                  {

                    payments.map(

                      (payment: any) => (

                        <div

                          key={payment.id}

                          className="

                          bg-[#1A1A1A]

border

border-[#353535]

rounded-2xl

p-6

hover:border-[#60899B]

hover:-translate-y-1

transition-all

duration-300

                        "

                        >

                          <div className="space-y-2">

                            <p>

                              💰 ₹{payment.amount}

                            </p>

                            <p>

                              📌 {payment.status.toUpperCase()}

                            </p>

                            <p>

                              📅 {new Date(

                                payment.created_at

                              ).toLocaleDateString()}

                            </p>

                            <p>

                              🆔 {payment.razorpay_payment_id}

                            </p>

                          </div>

                        </div>

                      )

                    )

                  }

                </div>

              ) : (

                <div

                  className="

                  border

                  border-dashed

                  border-[#353535]

                  rounded-2xl

                  p-10

                  text-center

                  text-gray-500

                "

                >

                  No payments yet

                </div>

              )

            }

          </div>

        </div>

      </div>

    </main>

  );

}