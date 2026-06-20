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

Analyze this sales lead.

Name:

${body.name}

Company:

${body.company}

Give:

1. Strengths

2. Weaknesses

3. Priority

4. Suggested next action

Keep it concise.

`,

      });

    return Response.json({

      insights:

      response.text,

    });

  }

  catch(error) {

    console.log(error);

    return Response.json(

      {

        message:

        "AI failed",

      },

      {

        status:500,

      }

    );

  }

}