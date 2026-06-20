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
    .includes(search.toLowerCase())

  ||

  lead.phone
    ?.toLowerCase()
    .includes(search.toLowerCase())

  ||

  lead.email
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

    <main className="min-h-screen p-6 md:p-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

        <div>

          <p className="text-[#60899B]">

            CRM Workspace

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

            Leads ({filteredLeads.length})

          </h1>

        </div>

        <Link

          href="/api/export"

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

          ⬇️ Export CSV

        </Link>

      </div>

      {/* Search */}

      <input

        className="

w-full

bg-[#111111]

border

border-[#232323]

focus:border-[#60899B]

outline-none

rounded-3xl

p-5

mb-8

transition-all

duration-300

"

        placeholder="🔍 Search leads..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />

      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-10">

        {[

          {

            label:"All",

            value:"all"

          },

          {

            label:"⭐ High",

            value:"high"

          },

          {

            label:"🟡 Medium",

            value:"medium"

          },

          {

            label:"🔴 Low",

            value:"low"

          }

        ].map((item)=>(

          <button

            key={item.value}

            onClick={()=>

              setFilter(item.value)

            }

            className={`

px-5

py-3

rounded-2xl

transition-all

duration-300

hover:-translate-y-1

${

filter===item.value

? "bg-[#1C3E4E] border border-[#60899B]"

: "border border-[#353535] hover:border-[#60899B]"

}

`}

          >

            {item.label}

          </button>

        ))}

      </div>

      {/* Leads */}

      <div className="space-y-6">

        {

          filteredLeads.length === 0 ? (

            <div

              className="

              bg-[#111111]

              border

              border-[#232323]

              rounded-3xl

              p-16

              text-center

            "

            >

              <h2 className="text-3xl mb-4">

                📭

              </h2>

              <p className="text-[#60899B]">

No leads found

</p>

            </div>

          ) : (

            filteredLeads.map((lead)=>(

              <Link

                key={lead.id}

                href={`/leads/${lead.id}`}

              >

                <div

                  className="

                  bg-[#111111]

                  border

                  border-[#232323]

                  rounded-3xl

                  p-8

                  hover:-translate-y-1

hover:border-[#285C70]

hover:shadow-2xl

transition-all

duration-300

cursor-pointer

                "

                >

                  <div className="flex flex-col md:flex-row md:justify-between gap-6">

                    <div>

                      <h2 className="text-3xl font-bold">

                        {lead.name}

                      </h2>

                      <p className="mt-3">

                        📧 {lead.email}

                      </p>

                      <p>

                        🏢 {lead.company}

                      </p>

                      <p>

  📞 {lead.phone || "-"}

</p>

                    </div>

                    <div className="space-y-3">

                      <p>

                        🟢 {lead.stage}

                      </p>

                      <p>

                        🤖 {lead.ai_score ?? 0}/10

                      </p>

                    </div>

                  </div>

                </div>

              </Link>

            ))

          )

        }

      </div>

    </main>

  );

}