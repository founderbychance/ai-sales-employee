import { gemini } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const body = await req.json();

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