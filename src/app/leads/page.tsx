"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function LeadsPage() {

  const { userId } = useAuth();

  const [leads, setLeads] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  useEffect(() => {

    async function fetchLeads() {

      if (!userId) return;

      const { data } = await supabase

        .from("leads")

        .select("*")

        .eq("user_id", userId)

        .order("created_at", {

          ascending: false,

        });

      setLeads(data || []);

    }

    fetchLeads();

  }, [userId]);

  const filteredLeads = leads.filter((lead) => {

    const matchesSearch =

      lead.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      lead.company
        ?.toLowerCase()
        .includes(search.toLowerCase());

    if (!matchesSearch) {

      return false;

    }

    if (filter === "high") {

      return lead.ai_score >= 7;

    }

    if (filter === "medium") {

      return lead.ai_score >= 4

        && lead.ai_score <= 6;

    }

    if (filter === "low") {

      return lead.ai_score <= 3;

    }

    return true;

  });

  return (

    <main className="min-h-screen p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">

          Leads

        </h1>

        <Link

  href="/api/export"

  className="border px-4 py-2 rounded hover:bg-gray-100"

>

  ⬇️ Export CSV

</Link>

      </div>

      <input

        className="border p-3 rounded w-full mb-8"

        placeholder="🔍 Search leads..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />

      <div className="flex gap-3 mb-8">

        <button

          className="border px-4 py-2 rounded"

          onClick={() => setFilter("all")}

        >

          All

        </button>

        <button

          className="border px-4 py-2 rounded"

          onClick={() => setFilter("high")}

        >

          ⭐ High

        </button>

        <button

          className="border px-4 py-2 rounded"

          onClick={() => setFilter("medium")}

        >

          🟡 Medium

        </button>

        <button

          className="border px-4 py-2 rounded"

          onClick={() => setFilter("low")}

        >

          🔴 Low

        </button>

      </div>

      <div className="space-y-4">

  {

    filteredLeads.length === 0 ? (

      <div className="border rounded-xl p-10 text-center">

        No leads found.

      </div>

    ) : (

      filteredLeads.map((lead) => (

          <Link

            key={lead.id}

            href={`/leads/${lead.id}`}

          >

            <div

              className="border p-4 rounded-lg space-y-2 hover:bg-gray-100 cursor-pointer"

            >

              <h2 className="font-bold text-xl">

                {lead.name}

              </h2>

              <p>📧 {lead.email}</p>

              <p>🏢 {lead.company}</p>

              <p>🟢 Status: {lead.status}</p>

              <p>

                 🤖 AI Score:

                {lead.ai_score ?? 0}/10

              </p>

            </div>

          </Link>

        ))

)

}

</div>

    </main>

  );

}