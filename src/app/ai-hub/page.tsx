import Link from "next/link";

export default function AIHubPage() {

  const tools = [

    {

icon:"🎯",

title:"Goals",

href:"/goals",

},

{

icon:"🏢",

title:"Workspace",

href:"/workspace",

},

    {

      icon:"👥",

      title:"Team Members",
      
      href:"/team",

    },

    {

      icon:"📧",

      title:"Email Generator",

      href:"/email-generator",

    },

    {

      icon:"📬",

      title:"Gmail",

      href:"/gmail",

    },

{

  icon:"🤖",

  title:"AI Copilot",

  href:"/copilot",

},

    {

      icon:"📱",

      title:"WhatsApp Generator",

      href:"/whatsapp-generator",

    },

    {

      icon:"🧠",

      title:"Daily Briefing",

      href:"/ai-briefing",

    },

    {

      icon:"✨",

      title:"Follow-up Generator",

      href:"/followup-generator",

    },

    {

      icon:"📊",

      title:"Lead Insights",

      href:"/lead-insights",

    },

  ];

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-[#60899B]">

          AI Employee

        </p>

        <h1

          className="

          text-5xl

          font-black

          mb-10

          bg-gradient-to-r

          from-[#F2EDEA]

          via-[#60899B]

          to-[#285C70]

          bg-clip-text

          text-transparent

        "

        >

          🤖 AI Hub

        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            tools.map(

              (tool)=>(

                <Link

                  key={tool.title}

                  href={tool.href}

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

                  <h2 className="text-3xl">

                    {tool.icon}

                  </h2>

                  <h3

                    className="

                    text-2xl

                    font-bold

                    mt-4

                  "

                  >

                    {tool.title}

                  </h3>

                </Link>

              )

            )

          }

        </div>

      </div>

    </main>

  );

}