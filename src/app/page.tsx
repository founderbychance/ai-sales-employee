"use client";

import Link from "next/link";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Home() {

  const { isSignedIn } = useUser();

  return (

    <main className="min-h-screen p-10">

      <div className="flex justify-between items-center mb-20">

        <h1 className="text-3xl font-bold">

          LeadsHijack AI

        </h1>

        {!isSignedIn ? (

          <SignInButton mode="modal">

            <button className="border px-4 py-2 rounded">

              🔐 Sign In

            </button>

          </SignInButton>

        ) : (

          <UserButton />

        )}

      </div>

      <section className="text-center mb-20">

        <h1 className="text-6xl font-bold mb-6">

          Capture, Score & Convert Leads

        </h1>

        <p className="text-xl text-gray-500 mb-10">

          Steal Attention. Win Customers.

        </p>

        <Link
          href="/dashboard"
          className="border px-6 py-4 rounded text-lg"
        >

          🚀 Open Dashboard

        </Link>

      </section>

      <section className="grid md:grid-cols-3 gap-8">

        <div className="border rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-4">

            🤖 AI Scoring

          </h2>

          <p>

            Automatically score every lead.

          </p>

        </div>

        <div className="border rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-4">

            📊 Analytics

          </h2>

          <p>

            Visualize lead quality instantly.

          </p>

        </div>

        <div className="border rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-4">

            📧 Notifications

          </h2>

          <p>

            Get emails whenever a new lead arrives.

          </p>

        </div>

      </section>

    </main>

  );

}