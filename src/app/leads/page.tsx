"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LeadsPage() {

  const [leads, setLeads] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    async function fetchLeads() {

      const { data } = await supabase

        .from("leads")

        .select("*")

        .order("created_at", {

          ascending: false,

        });

      setLeads(data || []);

    }

    fetchLeads();

  }, []);

  const filteredLeads =

    leads.filter((lead) =>

      lead.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      lead.company
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">

        Leads

      </h1>

      <input

        className="border p-3 rounded w-full mb-8"

        placeholder="🔍 Search leads..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />

      <div className="space-y-4">

        {filteredLeads.map((lead) => (

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

              <p>

📧 {lead.email}

              </p>

              <p>

🏢 {lead.company}

              </p>

              <p>

🟢 Status: {lead.status}

              </p>

              <p>

🤖 AI Score: {lead.ai_score}/10

              </p>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );

}