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

      <div className="max-w-7xl mx-auto p-10">

        {/* HEADER */}

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

        {/* BETA BANNER */}

        <section className="flex justify-center mb-10">

          <div className="border rounded-full px-6 py-2">

            🚀 Beta Program • Accepting 10 Businesses

          </div>

        </section>

        {/* HERO */}

        <section className="text-center mb-24">

          <p className="text-sm font-semibold mb-4">

            AI POWERED SALES CRM

          </p>

          <h1 className="text-6xl font-bold mb-6">

            Hire an AI Sales Employee

          </h1>

          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10">

            Capture, score and organize every lead automatically.

            Never lose a customer again.

          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link

              href="/dashboard"

              className="border px-6 py-4 rounded text-lg"

            >

              🚀 Open Dashboard

            </Link>

            <Link

              href="/leads"

              className="border px-6 py-4 rounded text-lg"

            >

              👥 View Leads

            </Link>

            <Link

              href="/waitlist"

              className="border px-6 py-4 rounded text-lg"

            >

              ✉️ Join Waitlist

            </Link>

          </div>

        </section>

        {/* CREATE LEAD */}

        <section className="mb-24 flex justify-center">

          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-center mb-6">

              🚀 Create a Lead

            </h2>

            <LeadForm />

          </div>

        </section>

        {/* FEATURES */}

        <section className="grid md:grid-cols-4 gap-6 mb-24">

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

              Visualize business performance instantly.

            </p>

          </div>

          <div className="border rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-4">

              📧 Notifications

            </h2>

            <p>

              Receive email alerts for new leads.

            </p>

          </div>

          <div className="border rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-4">

              📋 Kanban

            </h2>

            <p>

              Organize leads through your sales pipeline.

            </p>

          </div>

        </section>

        {/* BUILT FOR */}

        <section className="mb-24">

          <h2 className="text-4xl font-bold text-center mb-12">

            🎯 Built For

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="border rounded-xl p-8 text-center">

              <h3 className="text-2xl font-bold mb-4">

                📣 Marketing Agencies

              </h3>

              <p>

                Capture and organize incoming client leads.

              </p>

            </div>

            <div className="border rounded-xl p-8 text-center">

              <h3 className="text-2xl font-bold mb-4">

                🧑‍💼 Consultants

              </h3>

              <p>

                Never lose track of potential clients.

              </p>

            </div>

            <div className="border rounded-xl p-8 text-center">

              <h3 className="text-2xl font-bold mb-4">

                💻 Freelancers

              </h3>

              <p>

                Manage leads without spreadsheets.

              </p>

            </div>

          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="mb-24">

          <h2 className="text-4xl font-bold text-center mb-12">

            ⚡ How It Works

          </h2>

          <div className="grid md:grid-cols-5 gap-6">

            <div className="border rounded-xl p-6 text-center">

              <h3 className="text-4xl mb-4">

                1️⃣

              </h3>

              <p>Create a Lead</p>

            </div>

            <div className="border rounded-xl p-6 text-center">

              <h3 className="text-4xl mb-4">

                2️⃣

              </h3>

              <p>AI Scores It</p>

            </div>

            <div className="border rounded-xl p-6 text-center">

              <h3 className="text-4xl mb-4">

                3️⃣

              </h3>

              <p>Organize in Kanban</p>

            </div>

            <div className="border rounded-xl p-6 text-center">

              <h3 className="text-4xl mb-4">

                4️⃣

              </h3>

              <p>Set Follow-ups</p>

            </div>

            <div className="border rounded-xl p-6 text-center">

              <h3 className="text-4xl mb-4">

                5️⃣

              </h3>

              <p>Close More Clients</p>

            </div>

          </div>

        </section>

        {/* EARLY ACCESS */}

        <section className="mb-24">

          <div className="border rounded-xl p-10 text-center">

            <h2 className="text-4xl font-bold mb-6">

              🚀 Early Access

            </h2>

            <p className="text-xl text-gray-500 mb-6">

              We're currently onboarding our first 10 businesses.

            </p>

            <p>

              Join early and help shape the future of AI-powered sales.

            </p>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t pt-10 text-center text-gray-500">

          LeadsHijack AI © 2026

        </footer>

      </div>

    </main>

  );

}