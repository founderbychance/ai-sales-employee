import { resend } from "@/lib/resend";
import { auth } from "@clerk/nextjs/server";
import { gemini } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { userId } = await auth();

if (!userId) {

  return Response.json(

    {

      message: "Unauthorized",

    },

    {

      status: 401,

    }

  );

}

const startOfMonth = new Date();

startOfMonth.setDate(1);

startOfMonth.setHours(

  0,

  0,

  0,

  0

);

const { data: profile } =

  await supabase

    .from("profiles")

    .select("*")

    .eq("user_id", userId)

    .single();

const leadLimit =

  profile?.lead_limit || 5;

const { count } =

  await supabase

    .from("leads")

    .select("*", {

      count: "exact",

      head: true,

    })

    .eq("user_id", userId)

    .gte(

      "created_at",

      startOfMonth.toISOString()

    );

if ((count || 0) >= leadLimit) {

  return Response.json(

    {

      message:

        "Lead limit reached. Upgrade 🚀",

    },

    {

      status: 403,

    }

  );

}

    let aiScore = 5;

    let aiSummary = "No summary available.";

    try {

      const response =
        await gemini.models.generateContent({

          model: "gemini-2.5-flash",

          contents: `
You are an AI sales assistant.

Analyze this lead.

Name: ${body.name}

Company: ${body.company}

Return ONLY valid JSON.

{
  "score": 8,
  "summary": "Short one sentence summary."
}
`,

        });

      const text =
        response.text?.trim() || "";

      const cleaned =
        text
          .replace("```json", "")
          .replace("```", "")
          .trim();

      const result =
        JSON.parse(cleaned);

      aiScore = result.score || 5;

      aiSummary =
        result.summary ||
        "No summary available.";

    } catch (error) {

      console.log(
        "Gemini error:",
        error
      );

    }

    const { data, error } =
      await supabase

      .from("leads")

      .insert([
  {
    user_id: userId,

    name: body.name,

    email: body.email,

    company: body.company,

    status: "new",

    ai_score: aiScore,

    ai_summary: aiSummary,
  },
])
      .select();

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

    try {

  if (resend) {

    await resend.emails.send({

      from: "onboarding@resend.dev",

      to: ["founderbychance@gmail.com"],

      subject: "🚀 New Lead Received",

      html: `

        <h2>New Lead</h2>

        <p><strong>Name:</strong> ${body.name}</p>

        <p><strong>Company:</strong> ${body.company}</p>

        <p><strong>Email:</strong> ${body.email}</p>

        <p><strong>AI Score:</strong> ${aiScore}/10</p>

        <p><strong>AI Summary:</strong> ${aiSummary}</p>

      `,

    });

  }

} catch (error) {

  console.log(

    "Email error:",

    error

  );

}
    return Response.json({

      message:
        "Lead saved successfully",

      data,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );

  }

}