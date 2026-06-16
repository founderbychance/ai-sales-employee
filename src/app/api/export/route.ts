import { supabase } from "@/lib/supabase";

export async function GET() {

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {

    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }

  const headers = [

    "name",

    "email",

    "company",

    "status",

    "ai_score",

    "ai_summary",

  ];

  const rows =
    data.map((lead) => [

      lead.name,

      lead.email,

      lead.company,

      lead.status,

      lead.ai_score,

      `"${lead.ai_summary}"`,

    ]);

  const csv = [

    headers.join(","),

    ...rows.map(

      (row) => row.join(",")

    ),

  ].join("\n");

  return new Response(csv, {

    headers: {

      "Content-Type":
        "text/csv",

      "Content-Disposition":
        'attachment; filename="leads.csv"',

    },

  });

}