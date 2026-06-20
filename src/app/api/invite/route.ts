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

    if (!body.email) {

      return Response.json(

        {

          message: "Email required",

        },

        {

          status: 400,

        }

      );

    }

    const { data: workspace } =

      await supabase

        .from("workspaces")

        .select("*")

        .eq(

          "owner_id",

          userId

        )

        .single();

    if (!workspace) {

      return Response.json(

        {

          message:

            "Create a workspace first",

        },

        {

          status: 400,

        }

      );

    }

    const { error } =

      await supabase

        .from("invites")

        .insert([

          {

            workspace_id:

              workspace.id,

            email:

              body.email,

            role:

              body.role ||

              "member",

            status:

              "pending",

          },

        ]);

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

      message:

        "Invite created",

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