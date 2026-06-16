import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export async function POST() {

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

    const { data } = await supabase

      .from("profiles")

      .select("*")

      .eq("user_id", userId)

      .single();

    if (data) {

      return Response.json({

        message: "Profile already exists",

      });

    }

    const { error } = await supabase

      .from("profiles")

      .insert([

        {

          user_id: userId,

          plan: "free",

          lead_limit: 5,

        },

      ]);

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

      message: "Profile created",

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