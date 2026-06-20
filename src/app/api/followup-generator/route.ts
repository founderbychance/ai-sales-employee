import { gemini } from "@/lib/gemini";

export async function POST(

  req: Request

) {

  try {

    const body = await req.json();

    const response =

      await gemini.models.generateContent({

        model:"gemini-2.5-flash",

        contents:`

Write a professional follow-up message.

Lead:

${body.name}

Company:

${body.company}

Keep it under 120 words.

`,

      });

    return Response.json({

      message:

      response.text,

    });

  }

  catch(error){

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