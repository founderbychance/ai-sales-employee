import Link from "next/link";

export default function PricingPage() {

  const plans = [

    {

      name: "Freelancer",

      price: "₹499",

      features: [

        "1 User",

        "500 Leads",

        "AI Tools",

        "Basic Analytics",

      ],

    },

    {

      name: "Team",

      price: "₹1499",

      features: [

        "5 Users",

        "5000 Leads",

        "Workspace",

        "Gmail",

        "WhatsApp",

      ],

    },

    {

      name: "Business",

      price: "₹3999",

      features: [

        "25 Users",

        "Unlimited Leads",

        "AI Copilot",

        "Advanced Analytics",

      ],

    },

    {

      name: "Enterprise",

      price: "Custom",

      features: [

        "Unlimited Users",

        "Unlimited Leads",

        "Priority Support",

      ],

    },

  ];

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <p className="text-[#60899B]">

          Pricing

        </p>

        <h1

          className="

          text-5xl

          font-black

          mb-12

          bg-gradient-to-r

          from-[#F2EDEA]

          via-[#60899B]

          to-[#285C70]

          bg-clip-text

          text-transparent

        "

        >

          💰 Choose Your Plan

        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {

            plans.map((plan)=>(

              <div

                key={plan.name}

                className="

                bg-[#111111]

                border

                border-[#232323]

                rounded-3xl

                p-8

                hover:border-[#60899B]

                hover:-translate-y-2

                transition-all

                duration-300

              "

              >

                <h2 className="text-3xl font-bold">

                  {plan.name}

                </h2>

                <h3 className="text-5xl font-black mt-6">

                  {plan.price}

                </h3>

                <p className="text-gray-400">

                  /month

                </p>

                <div className="mt-8 space-y-4">

                  {

                    plan.features.map(

                      (feature)=>(

                        <p key={feature}>

                          ✅ {feature}

                        </p>

                      )

                    )

                  }

                </div>

                <Link

                  href="/billing"

                  className="

                  mt-10

                  inline-block

                  bg-[#1C3E4E]

                  hover:bg-[#285C70]

                  px-5

                  py-3

                  rounded-2xl

                  transition-all

                "

                >

                  🚀 Choose Plan

                </Link>

              </div>

            ))

          }

        </div>

      </div>

    </main>

  );

}