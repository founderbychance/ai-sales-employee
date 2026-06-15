import { supabase } from "@/lib/supabase";

export default async function LeadDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {

    return (

      <main className="p-10">

        Lead not found

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

          {data.name}

        </h2>

        <p>

📧 {data.email}

        </p>

        <p>

🏢 {data.company}

        </p>

        <p>

🟢 Status: {data.status}

        </p>

        <p>

🤖 AI Score: {data.ai_score}/10

        </p>

      </div>

    </main>

  );
}