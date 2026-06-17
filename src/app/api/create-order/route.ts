import Razorpay from "razorpay";

export async function POST() {

  try {

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

  catch (error) {

    console.log(error);

    return Response.json(

      {

        message:

          "Failed to create order",

      },

      {

        status: 500,

      }

    );

  }

}