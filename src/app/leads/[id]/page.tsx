"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LeadDetailsPage() {

  const params = useParams();

  const [lead, setLead] = useState<any>(null);

  const [followUpDate, setFollowUpDate] = useState("");

  const [followUpNote, setFollowUpNote] = useState("");

  const [notes, setNotes] = useState("");

  useEffect(() => {

    async function fetchLead() {

      const { data } = await supabase

        .from("leads")

        .select("*")

        .eq("id", params.id)

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

    }

    fetchLead();

  }, [params.id]);

  async function updateStage(
    stage: string
  ) {

    await supabase

      .from("leads")

      .update({

        stage,

      })

      .eq("id", params.id);

    setLead({

      ...lead,

      stage,

    });

  }

  async function saveReminder() {

    const { error } = await supabase

      .from("leads")

      .update({

        follow_up_date:
          followUpDate,

        follow_up_note:
          followUpNote,

      })

      .eq("id", params.id);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Reminder saved ✅");

  }

  async function saveNotes() {

    const { error } = await supabase

      .from("leads")

      .update({

        notes,

      })

      .eq("id", params.id);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Notes saved ✅");

  }

  if (!lead) {

    return (

      <main className="p-10">

        Loading...

      </main>

    );

  }

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">

        Lead Details

      </h1>

      <div className="border rounded-xl p-6 space-y-4">

        <h2 className="text-2xl font-bold">

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

        <p>

📝 {lead.ai_summary}

        </p>

        <div className="pt-6">

          <p className="mb-3 font-bold">

            Pipeline Stage

          </p>

          <div className="flex gap-3 flex-wrap">

            <button

              className="border px-4 py-2 rounded"

              onClick={() =>

                updateStage("new")

              }

            >

              🟢 New

            </button>

            <button

              className="border px-4 py-2 rounded"

              onClick={() =>

                updateStage("contacted")

              }

            >

              🟡 Contacted

            </button>

            <button

              className="border px-4 py-2 rounded"

              onClick={() =>

                updateStage("qualified")

              }

            >

              🔵 Qualified

            </button>

            <button

              className="border px-4 py-2 rounded"

              onClick={() =>

                updateStage("won")

              }

            >

              🟣 Won

            </button>

            <button

              className="border px-4 py-2 rounded"

              onClick={() =>

                updateStage("lost")

              }

            >

              🔴 Lost

            </button>

          </div>

          <p className="mt-4">

            Current Stage:

            <strong>

              {" "}

              {lead.stage}

            </strong>

          </p>

        </div>

        <div className="mt-10 space-y-4">

          <h3 className="text-xl font-bold">

            📅 Follow-up Reminder

          </h3>

          <input

            type="date"

            className="border p-3 rounded w-full"

            value={followUpDate}

            onChange={(e) =>

              setFollowUpDate(
                e.target.value
              )

            }

          />

          <textarea

            className="border p-3 rounded w-full"

            rows={4}

            placeholder="Reminder note..."

            value={followUpNote}

            onChange={(e) =>

              setFollowUpNote(
                e.target.value
              )

            }

          />

          <button

            className="border px-4 py-2 rounded"

            onClick={saveReminder}

          >

            💾 Save Reminder

          </button>

        </div>

        <div className="mt-10 space-y-4">

          <h3 className="text-xl font-bold">

            📝 Notes

          </h3>

          <textarea

            className="border p-3 rounded w-full"

            rows={5}

            placeholder="Add notes..."

            value={notes}

            onChange={(e) =>

              setNotes(
                e.target.value
              )

            }

          />

          <button

            className="border px-4 py-2 rounded"

            onClick={saveNotes}

          >

            💾 Save Notes

          </button>

        </div>

      </div>

    </main>

  );

}