import Razorpay from "razorpay";

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

    const { data: profile } = await supabase

      .from("profiles")

      .select("*")

      .eq("user_id", userId)

      .single();

    if (profile?.plan === "pro") {

      return Response.json(

        {

          message:

            "You are already a Pro member",

        },

        {

          status: 400,

        }

      );

    }

    if (

      !process.env.RAZORPAY_KEY_ID ||

      !process.env.RAZORPAY_KEY_SECRET

    ) {

      return Response.json(

        {

          message:

            "Razorpay environment variables are missing",

        },

        {

          status: 500,

        }

      );

    }

    const razorpay = new Razorpay({

      key_id:

        process.env.RAZORPAY_KEY_ID,

      key_secret:

        process.env.RAZORPAY_KEY_SECRET,

    });

    const order = await razorpay.orders.create({

      amount: 49900,

      currency: "INR",

      receipt:

        `leadshijack_${Date.now()}`,

      notes: {

        product:

          "LeadsHijack AI Pro",

      },

    });

    return Response.json(order);

  }

  catch (error: any) {

    console.log(

      "RAZORPAY ERROR:",

      error

    );

    return Response.json(

      {

        message:

          error?.error?.description ||

          error?.message ||

          "Failed to create order",

      },

      {

        status: 500,

      }

    );

  }

}