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

  const { data: profile, error } = await supabase

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

  return (

    <main className="min-h-screen p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">

          💳 Billing

        </h1>

        <div className="space-y-8">

          {/* Current Plan */}

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-4">

              📦 Current Plan

            </h2>

            <p className="text-2xl">

  {profile?.plan?.toUpperCase() || "FREE"}

</p>

            <p className="text-gray-500 mt-2">

              Lead limit: {profile?.lead_limit ?? 5}

            </p>

          </div>

          {/* Upgrade */}

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              🚀 Upgrade

            </h2>

            <div className="flex gap-4 flex-wrap">

              <Link

                href="/upgrade"

                className="border px-6 py-3 rounded"

              >

                View Plans

              </Link>

              <a

                href="mailto:forgegroupofficial@gmail.com?subject=LeadsHijack AI Business Plan"

                className="border px-6 py-3 rounded"

              >

                📩 Contact Sales

              </a>

            </div>

          </div>

          {/* Payment History */}

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              🧾 Payment History

            </h2>

            {

              payments?.length ? (

                <div className="space-y-4">

                  {payments.map((payment: any) => (

                    <div

                      key={payment.id}

                      className="border rounded-lg p-4"

                    >

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

                  ))}

                </div>

              ) : (

                <p>

                  No payments yet

                </p>

              )

            }

          </div>

        </div>

      </div>

    </main>

  );

}