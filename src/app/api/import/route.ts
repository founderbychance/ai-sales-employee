import Papa from "papaparse";

import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

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

          status: 401,

        }

      );

    }

    const formData =

      await req.formData();

    const file =

      formData.get(

        "file"

      ) as File;

    if (!file) {

      return Response.json(

        {

          message:

            "No file",

        },

        {

          status: 400,

        }

      );

    }

    const csv =

      await file.text();

    const parsed =

      Papa.parse(csv, {

        header: true,

        skipEmptyLines: true,

      });

    const rows =

      parsed.data as any[];

    const leads = rows

  .filter(

    (row) =>

      row.name && row.email

  )

  .map((row) => ({

    user_id: userId,

    name:

      row.name.trim(),

    email:

      row.email.trim(),

    phone:

      row.phone?.trim()

      || "",

    company:

      row.company?.trim()

      || "",

    status: "new",

    stage: "new",

    ai_score: 5,

    ai_summary:

      "Imported via CSV",

  }));

    const { error } =

      await supabase

        .from("leads")

        .insert(leads);

    if (error) {

      return Response.json(

        {

          message:

            error.message,

        },

        {

          status: 500,

        }

      );

    }

    return Response.json({

      count:

        leads.length,

    });

  }

  catch(error) {

    console.log(error);

    return Response.json(

      {

        message:

          "Import failed",

      },

      {

        status: 500,

      }

    );

  }

}