import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export async function POST(

  req: Request

) {

  try {

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

    const body = await req.json();

    if (

      !body.name ||

      !body.type

    ) {

      return Response.json(

        {

          message:

            "Missing fields",

        },

        {

          status: 400,

        }

      );

    }

    const { data: existing } =

      await supabase

        .from("workspaces")

        .select("*")

        .eq(

          "owner_id",

          userId

        )

        .single();

    if (existing) {

      return Response.json(

        {

          message:

            "Workspace already exists",

        },

        {

          status: 400,

        }

      );

    }

    const { data, error } =

      await supabase

        .from("workspaces")

        .insert([

          {

            name:

              body.name,

            type:

              body.type,

            owner_id:

              userId,

            plan:

              "free",

          },

        ])

        .select()

        .single();

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

    await supabase

      .from("workspace_members")

      .insert([

        {

          workspace_id:

            data.id,

          user_id:

            userId,

          role:

            "owner",

        },

      ]);

    return Response.json({

      message:

        "Workspace created",

    });

  }

  catch (error) {

    console.log(error);

    return Response.json(

      {

        message:

          "Server error",

      },

      {

        status: 500,

      }

    );

  }

}