"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

export default function WaitlistPage() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [business, setBusiness] = useState("");

  async function joinWaitlist(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const { error } = await supabase

      .from("waitlist")

      .insert([

        {

          name,

          email,

          business,

        },

      ]);

    if (error) {

      alert(error.message);

      return;

    }

    alert(

      "🎉 You're on the waitlist!"

    );

    setName("");

    setEmail("");

    setBusiness("");

  }

  return (

    <main className="min-h-screen p-10">

      <div className="max-w-xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">

          🚀 Join Our Waitlist

        </h1>

        <p className="text-center text-gray-500 mb-10">

          Get early access to LeadsHijack AI Pro.

        </p>

        <form

          onSubmit={joinWaitlist}

          className="flex flex-col gap-4"

        >

          <input

            className="border p-3 rounded"

            placeholder="Your Name"

            value={name}

            onChange={(e) =>

              setName(e.target.value)

            }

            required

          />

          <input

            className="border p-3 rounded"

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>

              setEmail(e.target.value)

            }

            required

          />

          <input

            className="border p-3 rounded"

            placeholder="Business Name"

            value={business}

            onChange={(e) =>

              setBusiness(e.target.value)

            }

          />

          <button

            type="submit"

            className="bg-black text-white p-3 rounded"

          >

            🚀 Join Waitlist

          </button>

        </form>

      </div>

    </main>

  );

}