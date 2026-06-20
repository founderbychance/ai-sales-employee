"use client";

import { useState } from "react";

import Link from "next/link";

export default function HamburgerMenu() {

  const [open, setOpen] = useState(false);

  const menuItems = [

    {

      href: "/ai-hub",

      title: "🤖 AI Hub",

    },

    {

      href: "/email-generator",

      title: "📧 AI Email",

    },

    {

      href: "/kanban",

      title: "📋 Kanban",

    },

    {

      href: "/analytics",

      title: "📈 Analytics",

    },

    {

      href: "/calendar",

      title: "📅 Calendar",

    },

    {

      href: "/notifications",

      title: "🔔 Notifications",

    },

    {

      href: "/billing",

      title: "💳 Billing",

    },

    {

      href: "/import",

      title: "📥 CSV Import",

    },

    {

      href: "/gmail",

      title: "📧 Gmail",

    },

    {
      
      href: "/whatsapp",

      title: "💬 WhatsApp",

    },

    {

      href: "/pricing",

      title: "💰 Pricing",

    },

    {

      href: "/settings",

      title: "⚙️ Settings",

    },

    {

      href: "/admin",

      title: "🛠️ Admin",

    },

  ];

  return (

    <div className="relative">

      <button

        onClick={() => setOpen(!open)}

        className="

        text-2xl

        px-4

        py-2

        rounded-xl

        hover:bg-[#1C3E4E]

        transition-all

        duration-300

      "

      >

        ☰

      </button>

      {

        open && (

          <div

            className="

            absolute

            right-0

            top-14

            w-72

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-5

            shadow-2xl

            z-50

          "

          >

            <div className="flex flex-col gap-4">

              {

                menuItems.map(

                  (item)=>(

                    <Link

                      key={item.href}

                      href={item.href}

                      onClick={()=>

                        setOpen(false)

                      }

                      className="

                      hover:text-[#60899B]

                      transition-all

                      duration-300

                    "

                    >

                      {item.title}

                    </Link>

                  )

                )

              }

            </div>

          </div>

        )

      }

    </div>

  );

}