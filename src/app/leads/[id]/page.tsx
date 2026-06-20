"use client";

import { useEffect, useState } from "react";

import {

  useParams,

  useRouter,

} from "next/navigation";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@clerk/nextjs";

export default function LeadDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const { userId } = useAuth();

  const [loading, setLoading] =

    useState(true);

  const [lead, setLead] =

    useState<any>(null);

  const [followUpDate,

    setFollowUpDate] =

    useState("");

  const [followUpNote,

    setFollowUpNote] =

    useState("");

  const [notes, setNotes] =

    useState("");

  const [message,

    setMessage] =

    useState("");

    const [priority,

  setPriority] =

  useState("");

const [favorite,

  setFavorite] =

  useState(false);

    const [suggestion, setSuggestion] =

  useState("");

const [loadingSuggestion,

  setLoadingSuggestion] =

  useState(false);

    useEffect(() => {

if (!message) return;

const timer = setTimeout(() => {

setMessage("");

}, 3000);

return () => clearTimeout(timer);

}, [message]);

  useEffect(() => {

    async function fetchLead() {

      if (!userId) return;

      const { data } =

        await supabase

          .from("leads")

          .select("*")

          .eq("id", params.id)

          .eq("user_id", userId)

          .single();

      setLead(data);

      setFollowUpDate(

        data?.follow_up_date || ""

      );

      setFollowUpNote(

        data?.follow_up_note || ""

      );

      setNotes(

        data?.notes || ""

      );

      setPriority(

  data?.priority ||

  "medium"

);

setFavorite(

  data?.is_favorite ||

  false

);

      setLoading(false);

    }

    fetchLead();

  }, [params.id, userId]);

  async function updateStage(

    stage: string

  ) {

    await supabase

      .from("leads")

      .update({

        stage,

      })

      .eq("id", params.id)

      .eq("user_id", userId);

    setLead({

      ...lead,

      stage,

    });

    setMessage("✅ Stage updated");

  }

  async function saveReminder() {

    const { error } =

      await supabase

        .from("leads")

        .update({

          follow_up_date:

            followUpDate,

          follow_up_note:

            followUpNote,

        })

        .eq("id", params.id)

        .eq("user_id", userId);

    if (error) {

      setMessage(error.message);

      return;

    }

    setMessage(

      "✅ Reminder saved"

    );

  }

  async function saveNotes() {

    const { error } =

      await supabase

        .from("leads")

        .update({

          notes,

        })

        .eq("id", params.id)

        .eq("user_id", userId);

    if (error) {

      setMessage(error.message);

      return;

    }

    setMessage(

      "✅ Notes saved"

    );

  }

  async function generateSuggestion() {

  if (loadingSuggestion) return;

  setLoadingSuggestion(true);

  try {

    const response = await fetch(

      "/api/ai-suggestion",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

        },

        body: JSON.stringify({

          name: lead.name,

          company: lead.company,

          ai_score: lead.ai_score,

          ai_summary: lead.ai_summary,

        }),

      }

    );

    const data =

      await response.json();

    setSuggestion(

      data.suggestion

    );

  }

  catch {

    setSuggestion(

      "Unable to generate suggestion."

    );

  }

  setLoadingSuggestion(false);

}

  async function saveLeadSettings() {

  const { error } =

    await supabase

      .from("leads")

      .update({

        priority,

        is_favorite:

          favorite,

      })

      .eq("id", params.id)

      .eq("user_id", userId);

  if (error) {

    setMessage(

      error.message

    );

    return;

  }

  setMessage(

    "✅ Lead updated"

  );

}

async function deleteLead() {

  await supabase

    .from("leads")

    .delete()

    .eq("id", params.id)

    .eq("user_id", userId);

  router.push("/leads");

}

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        Loading...

      </main>

    );

  }

  if (!lead) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        Lead not found

      </main>

    );

  }

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}

        <div>

          <p className="text-[#60899B]">

            Customer Profile

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

            {lead.name}

          </h1>

        </div>

        {/* Notification Bar */}

        {

          message && (

            <div

              className="

bg-[#1C3E4E]

text-white

p-4

rounded-2xl

shadow-xl

animate-pulse

"

            >

              {message}

            </div>

          )

        }

        {/* Lead Info */}

        <div

          className="

          bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

hover:border-[#285C70]

transition-all

duration-300

hover:-translate-y-1

        "

        >

          <div className="space-y-4">

            <p>

              📧 {lead.email}

            </p>

            <p>

  📞 {lead.phone || "-"}

</p>

            <p>

              🏢 {lead.company}

            </p>

            <p>

              🟢 {lead.stage}

            </p>

            <p>

              🤖 {lead.ai_score}/10

            </p>

            <p>

              📝 {lead.ai_summary}

            </p>

            <div className="flex flex-wrap gap-4 mt-6">

  <a

    href={`tel:${lead.phone}`}

    className="

    bg-[#1C3E4E]

    hover:bg-[#285C70]

    px-5

    py-3

    rounded-2xl

    transition-all

    duration-300

    "

  >

    📞 Call

  </a>

  <a

    href={`mailto:${lead.email}`}

    className="

    bg-[#1C3E4E]

    hover:bg-[#285C70]

    px-5

    py-3

    rounded-2xl

    transition-all

    duration-300

    "

  >

    📧 Email

  </a>

  <a

    href={`https://wa.me/${lead.phone}`}

    target="_blank"

    className="

    bg-[#1C3E4E]

    hover:bg-[#285C70]

    px-5

    py-3

    rounded-2xl

    transition-all

    duration-300

    "

  >

    💬 WhatsApp

  </a>

</div>

          </div>

        </div>

        {/* Stage */}

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-8

        "

        >

          <h2 className="text-2xl font-bold mb-6">

            Pipeline Stage

          </h2>

          <div className="flex flex-wrap gap-4">

            {["new",

              "contacted",

              "qualified",

              "won",

              "lost"]

              .map((stage)=>(

              <button

                key={stage}

                onClick={()=>

                  updateStage(stage)

                }

                className={`

px-5

py-3

rounded-2xl

transition-all

duration-300

hover:-translate-y-1

${

lead.stage===stage

? "bg-[#1C3E4E] border border-[#60899B]"

: "border border-[#353535] hover:border-[#60899B]"

}

`}

              >

                {stage}

              </button>

            ))}

          </div>

        </div>

        {/* Reminder */}

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-8

        "

        >

          <h2 className="text-2xl font-bold mb-6">

            📅 Reminder

          </h2>

          <div className="space-y-4">

            <input

              type="date"

              value={followUpDate}

              onChange={(e)=>

                setFollowUpDate(

                  e.target.value

                )

              }

              className="

w-full

bg-[#090909]

border

border-[#353535]

p-4

rounded-2xl

outline-none

focus:border-[#60899B]

focus:ring-2

focus:ring-[#285C70]/40

transition-all

duration-300

"

            />

            <textarea

              rows={4}

              value={followUpNote}

              onChange={(e)=>

                setFollowUpNote(

                  e.target.value

                )

              }

              className="

              w-full

              border

              border-[#353535]

              p-4

              rounded-2xl

            "

            />

            <button

              onClick={saveReminder}

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

              Save Reminder

            </button>

          </div>

        </div>

        {/* Notes */}

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-8

        "

        >

          <h2 className="text-2xl font-bold mb-6">

            📝 Notes

          </h2>

          <textarea

            rows={6}

            value={notes}

            onChange={(e)=>

              setNotes(

                e.target.value

              )

            }

            className="

            w-full

            border

            border-[#353535]

            p-4

            rounded-2xl

          "

          />

          <button

            onClick={saveNotes}

            className="

            mt-6

            bg-[#1C3E4E]

            px-6

            py-3

            rounded-2xl

          "

          >

            Save Notes

          </button>

        </div>

        {/* Priority & Favorite */}

<div

className="

bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

"

>

<h2

className="

text-2xl

font-bold

mb-6

"

>

⭐ Lead Settings

</h2>

<div className="space-y-6">

<select

value={priority}

onChange={(e)=>

setPriority(

e.target.value

)

}

className="

w-full

bg-[#090909]

border

border-[#353535]

p-4

rounded-2xl

"

>

<option value="low">

🟢 Low

</option>

<option value="medium">

🟡 Medium

</option>

<option value="high">

🔴 High

</option>

</select>

<label

className="

flex

items-center

gap-4

"

>

<input

type="checkbox"

checked={favorite}

onChange={(e)=>

setFavorite(

e.target.checked

)

}

/>

⭐ Favorite Lead

</label>

<button

onClick={saveLeadSettings}

className="

bg-[#1C3E4E]

hover:bg-[#285C70]

px-6

py-3

rounded-2xl

"

>

Save Settings

</button>

</div>

</div>

        {/* AI Suggestion */}

<div

className="

bg-[#111111]

border

border-[#232323]

rounded-3xl

p-8

hover:border-[#285C70]

transition-all

duration-300

"

>

<h2 className="text-2xl font-bold mb-6">

🧠 AI Suggestion

</h2>

{

suggestion && (

<div

className="

bg-[#1A1A1A]

border

border-[#353535]

rounded-2xl

p-5

mb-6

"

>

{suggestion}

</div>

)

}

<button

onClick={generateSuggestion}

disabled={loadingSuggestion}

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

{

loadingSuggestion

? "Generating..."

: "✨ Generate Suggestion"

}

</button>

</div>

        {/* Delete */}

        <div>

          <button

            onClick={deleteLead}

            className="

            bg-red-600

hover:bg-red-700

hover:-translate-y-1

hover:shadow-2xl

transition-all

duration-300

px-6

py-3

rounded-2xl

          "

          >

            🗑️ Delete Lead

          </button>

        </div>

      </div>

    </main>

  );

}