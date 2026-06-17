import Razorpay from "razorpay";

export async function POST() {

  try {

    console.log(

      "KEY:",

      process.env.RAZORPAY_KEY_ID

    );

    console.log(

      "SECRET EXISTS:",

      !!process.env.RAZORPAY_KEY_SECRET

    );

    const razorpay = new Razorpay({

      key_id:

        process.env.RAZORPAY_KEY_ID!,

      key_secret:

        process.env.RAZORPAY_KEY_SECRET!,

    });

    const order = await razorpay.orders.create({

      amount: 49900,

      currency: "INR",

      receipt:

        `receipt_${Date.now()}`,

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

          error.message,

      },

      {

        status: 500,

      }

    );

  }

}