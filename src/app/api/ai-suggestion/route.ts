import { gemini } from "@/lib/gemini";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const response =

      await gemini.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `

You are a sales assistant.

Lead Name: ${body.name}

Company: ${body.company}

AI Score: ${body.ai_score}

Summary: ${body.ai_summary}

Give ONE short follow-up action.

Example:

"Schedule a discovery call within 24 hours."

`,

      });

    return Response.json({

      suggestion:

        response.text ||

        "Follow up tomorrow.",

    });

  }

  catch (error) {

    console.log(error);

    return Response.json(

      {

        suggestion:

          "Unable to generate suggestion.",

      },

      {

        status: 500,

      }

    );

  }

}