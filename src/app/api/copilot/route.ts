import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

import { gemini } from "@/lib/gemini";

export async function POST(

  req: Request

) {

  try {

    const { userId } =

      await auth();

    if (!userId) {

      return Response.json(

        {

          message:

            "Unauthorized",

        },

        {

          status:401,

        }

      );

    }

    const body =

      await req.json();

    const { data: leads } =

      await supabase

      .from("leads")

      .select("*")

      .eq(

        "user_id",

        userId

      );

    const response =

      await gemini.models.generateContent({

        model:

        "gemini-2.5-flash",

        contents: `

You are SalesPilotAI.

User question:

${body.prompt}

Leads:

${JSON.stringify(leads)}

Give a short business answer.

`,

      });

    return Response.json({

      answer:

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