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

    } = await supabase

      .from("payments")

      .select("*")

      .eq(

        "razorpay_payment_id",

        razorpay_payment_id

      )

      .single();

    if (existingPayment) {

      return Response.json(

        {

          success: true,

          message:

            "Payment already processed",

        }

      );

    }

    await supabase

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

    await supabase

      .from("profiles")

      .update({

        plan: "pro",

        lead_limit: 100,

      })

      .eq(

        "user_id",

        userId

      );

    return Response.json({

      success: true,

    });

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