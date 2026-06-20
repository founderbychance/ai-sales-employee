"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname();

  const sections = [

    {

      title: "CRM",

      items: [

        {

          icon:"🏠",

          title:"Dashboard",

          href:"/dashboard",

        },

        {

          icon:"👥",

          title:"Leads",

          href:"/leads",

        },

        {

          icon:"📋",

          title:"Kanban",

          href:"/kanban",

        },

        {

          icon:"📅",

          title:"Calendar",

          href:"/calendar",

        },

        {

          icon:"📈",

          title:"Analytics",

          href:"/analytics",

        },

      ],

    },

    {

      title: "AI",

      items: [

        {

          icon:"🤖",

          title:"AI Hub",

          href:"/ai-hub",

        },

      ],

    },

    {

      title: "Workspace",

      items: [

        {

          icon:"🏢",

          title:"Workspace",

          href:"/workspace",

        },

        {

          icon:"👥",

          title:"Team",

          href:"/team",

        },

      ],

    },

    {

      title: "Integrations",

      items: [

        {

          icon:"📥",

          title:"Import",

          href:"/import",

        },

        {

          icon:"📧",

          title:"Gmail",

          href:"/gmail",

        },

        {

          icon:"💬",

          title:"WhatsApp",

          href:"/whatsapp",

        },

      ],

    },

    {

      title: "Business",

      items: [

        {

          icon:"💰",

          title:"Pricing",

          href:"/pricing",

        },

        {

          icon:"💳",

          title:"Billing",

          href:"/billing",

        },

      ],

    },

    {

      title: "System",

      items: [

        {

          icon:"🔔",

          title:"Notifications",

          href:"/notifications",

        },

        {

          icon:"⚙️",

          title:"Settings",

          href:"/settings",

        },

        {

          icon:"🛠️",

          title:"Admin",

          href:"/admin",

        },

      ],

    },

  ];

  return (

    <aside

      className="

      hidden

      xl:flex

      fixed

      left-0

      top-0

      h-screen

      w-72

      flex-col

      bg-[#111111]

      border-r

      border-[#232323]

      overflow-y-auto

      z-50

    "

    >

      {/* Header */}

      <div className="p-8">

        <h1

          className="

          text-3xl

          font-black

          bg-gradient-to-r

          from-[#60899B]

          to-[#285C70]

          bg-clip-text

          text-transparent

        "

        >

          SalesPilotAI

        </h1>

      </div>

      {/* Sections */}

      <div className="px-6 pb-10">

        {

          sections.map(

            (section)=>(

              <div

                key={section.title}

                className="mb-6"

              >

                {/* Title */}

                <p

                  className="

                  text-xs

                  uppercase

                  tracking-widest

                  text-gray-500

                  mb-3

                  px-3

                "

                >

                  {section.title}

                </p>

                {/* Items */}

                <div

                  className="

                  border

                  border-[#232323]

                  rounded-3xl

                  overflow-hidden

                "

                >

                  {

                    section.items.map(

                      (item,index)=>(

                        <Link

                          key={item.href}

                          href={item.href}

                          className={`

                          flex

                          items-center

                          gap-4

                          px-5

                          py-4

                          transition-all

                          duration-300

                          ${

                          pathname===item.href

                          ?

                          "bg-[#1C3E4E]"

                          :

                          "hover:bg-[#1A1A1A]"

                          }

                          ${

                          index !==

                          section.items.length-1

                          ?

                          "border-b border-[#232323]"

                          :

                          ""

                          }

                        `}

                        >

                          <span>

                            {item.icon}

                          </span>

                          <span>

                            {item.title}

                          </span>

                        </Link>

                      )

                    )

                  }

                </div>

              </div>

            )

          )

        }

      </div>

      <div

className="

mt-auto

border-t

border-[#232323]

p-6

"

>

<div

className="

flex

justify-between

items-center

"

>

<button

className="

hover:bg-[#1A1A1A]

p-3

rounded-xl

"

>

🔍

</button>

<button

className="

hover:bg-[#1A1A1A]

p-3

rounded-xl

"

>

➕

</button>

<button

className="

hover:bg-[#1A1A1A]

p-3

rounded-xl

"

>

⚙️

</button>

</div>

</div>

    </aside>

  );

}