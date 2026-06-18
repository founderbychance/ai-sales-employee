import Link from "next/link";

import PayButton from "@/components/PayButton";

import { supabase } from "@/lib/supabase";

export default async function UpgradePage() {

    const { data: profile } =

  await supabase

    .from("profiles")

    .select("*")

    .single();

const isPro =

  profile?.plan === "pro";

  if (isPro) {

  return (

    <main className="min-h-screen flex items-center justify-center">

      <div className="border rounded-xl p-10 text-center">

        <h1 className="text-4xl font-bold mb-4">

          🎉 You are already a Pro member

        </h1>

        <p className="text-gray-500 mb-8">

          Enjoy your premium features.

        </p>

        <Link

          href="/dashboard"

          className="border px-6 py-3 rounded"

        >

          📊 Open Dashboard

        </Link>

      </div>

    </main>

  );

}

  return (

    <main className="min-h-screen p-10">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold mb-4">

            🚀 Upgrade Your Plan

          </h1>

          <p className="text-xl text-gray-500">

            Grow your business with AI-powered lead management.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* FREE */}

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Free

            </h2>

            <p className="text-4xl font-bold mb-8">

              ₹0

              <span className="text-lg font-normal">

                /month

              </span>

            </p>

            <ul className="space-y-4 mb-10">

              <li>✅ 5 leads/month</li>

              <li>✅ AI scoring</li>

              <li>✅ Dashboard</li>

              <li>✅ Follow-up reminders</li>

            </ul>

            <button

              disabled

              className="border px-6 py-3 rounded w-full opacity-60"

            >

              Current Plan

            </button>

          </div>

          {/* PRO */}

          <div className="border rounded-xl p-8 shadow-lg">

            <div className="mb-4">

              <span className="border rounded-full px-3 py-1 text-sm">

                ⭐ Most Popular

              </span>

            </div>

            <h2 className="text-3xl font-bold mb-6">

              Pro

            </h2>

            <p className="text-4xl font-bold mb-8">

              ₹499

              <span className="text-lg font-normal">

                /one-time

              </span>

            </p>

            <ul className="space-y-4 mb-10">

              <li>✅ 100 leads/month</li>

              <li>✅ AI scoring</li>

              <li>✅ Dashboard</li>

              <li>✅ Kanban</li>

              <li>✅ Notes</li>

              <li>✅ Follow-up reminders</li>

            </ul>

            <PayButton />

          </div>

          {/* BUSINESS */}

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Business

            </h2>

            <p className="text-4xl font-bold mb-8">

              ₹1499

              <span className="text-lg font-normal">

                Custom

              </span>

            </p>

            <ul className="space-y-4 mb-10">

              <li>✅ Unlimited leads</li>

              <li>✅ Priority support</li>

              <li>✅ Everything included</li>

            </ul>

            <a

              href="mailto:forgegroupofficial@gmail.com?subject=LeadsHijack AI Business Plan"

              className="border px-6 py-3 rounded w-full block text-center"

            >

              📩 Contact Sales

            </a>

          </div>

        </div>

        <div className="mt-16 text-center">

          <Link

            href="/billing"

            className="border px-6 py-3 rounded"

          >

            💳 Open Billing

          </Link>

        </div>

      </div>

    </main>

  );

}