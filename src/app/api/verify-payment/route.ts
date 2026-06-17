import { auth } from "@clerk/nextjs/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

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

    const {

      razorpay_payment_id,

      razorpay_order_id,

    } = body;

    if (

      !razorpay_payment_id ||

      !razorpay_order_id

    ) {

      return Response.json(

        {

          message:

            "Invalid payment",

        },

        {

          status: 400,

        }

      );

    }

    const {

      data: existingPayment,

    } = await supabaseAdmin

      .from("payments")

      .select("*")

      .eq(

        "razorpay_payment_id",

        razorpay_payment_id

      )

      .maybeSingle();

    if (existingPayment) {

      return Response.json(

        {

          success: true,

          message:

            "Payment already processed",

        }

      );

    }

    await supabaseAdmin

      .from("payments")

      .insert([

        {

          user_id: userId,

          razorpay_payment_id,

          razorpay_order_id,

          amount: 499,

          status: "success",

        },

      ]);

    await supabaseAdmin

      .from("profiles")

      .upsert(

        {

          user_id: userId,

          plan: "pro",

          lead_limit: 100,

        },

        {

          onConflict: "user_id",

        }

      );

    return Response.json(

      {

        success: true,

      }

    );

  }

  catch (error) {

    console.log(error);

    return Response.json(

      {

        success: false,

      },

      {

        status: 500,

      }

    );

  }

}