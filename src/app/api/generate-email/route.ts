import { gemini } from "@/lib/gemini";

export async function POST(

  req: Request

) {

  try {

    const body = await req.json();

    const response =

      await gemini.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `

You are a professional sales representative.

Generate a personalized cold email.

Lead Name:

${body.name}

Company:

${body.company}

Email:

${body.email}

Return ONLY valid JSON.

{

"subject":"...",

"body":"..."

}

`,

      });

    const text =

      response.text?.trim() || "";

    const cleaned =

      text

      .replace("```json","")

      .replace("```","")

      .trim();

    const result =

      JSON.parse(cleaned);

    return Response.json({

      subject:

        result.subject,

      body:

        result.body,

    });

  }

  catch(error) {

    console.log(error);

    return Response.json(

      {

        message:

        "AI generation failed",

      },

      {

        status:500,

      }

    );

  }

}