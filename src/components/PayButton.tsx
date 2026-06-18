"use client";

import { useState } from "react";

export default function PayButton() {

  const [loading, setLoading] = useState(false);

  async function handlePayment() {

    if (loading) return;

    setLoading(true);

    try {

      const response = await fetch(

        "/api/create-order",

        {

          method: "POST",

        }

      );

      if (!response.ok) {

        alert(

          "Unable to start payment."

        );

        setLoading(false);

        return;

      }

      const order = await response.json();

      const options = {

        key:

          process.env

            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:

          order.amount,

        currency:

          order.currency,

        name:

          "LeadsHijack AI",

        description:

          "Pro Plan",

        order_id:

          order.id,

        prefill: {

          name: "",

          email: "",

          contact: "",

        },

        notes: {

          product:

            "LeadsHijack AI Pro",

        },

        theme: {

          color: "#000000",

        },

        handler: async function (

          response: any

        ) {

          const verify = await fetch(

            "/api/verify-payment",

            {

              method: "POST",

              headers: {

                "Content-Type":

                  "application/json",

              },

              body: JSON.stringify({

                razorpay_payment_id:

                  response.razorpay_payment_id,

                razorpay_order_id:

                  response.razorpay_order_id,

              }),

            }

          );

          if (!verify.ok) {

            alert(

              "Payment verification failed"

            );

            setLoading(false);

            return;

          }

          alert(

            "🎉 Pro Plan Activated"

          );

          window.location.href =

            "/dashboard";

        },

        modal: {

          ondismiss: function () {

            setLoading(false);

          },

        },

      };

      const razorpay = new (

        window as any

      ).Razorpay(options);

      razorpay.open();

    }

    catch (error) {

      console.log(error);

      alert(

        "Something went wrong"

      );

      setLoading(false);

    }

  }

  return (

    <button

      onClick={handlePayment}

      disabled={loading}

      className="border px-6 py-3 rounded w-full disabled:opacity-50"

    >

      {

        loading

          ? "Processing..."

          : "💳 Pay ₹499"

      }

    </button>

  );

}