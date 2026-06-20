export default function SetupChecklist() {

  const items = [

    "🏢 Create Workspace",

    "📥 Import Leads",

    "📧 Connect Gmail",

    "💬 Connect WhatsApp",

    "👥 Invite Team",

    "💳 Upgrade Plan",

  ];

  return (

    <div

      className="

      bg-[#111111]

      border

      border-[#232323]

      rounded-3xl

      p-8

    "

    >

      <h2

        className="

        text-3xl

        font-bold

        mb-8

      "

      >

        🚀 Setup Progress

      </h2>

      <div className="space-y-4">

        {

          items.map(

            (item)=>(

              <div

                key={item}

                className="

                flex

                items-center

                justify-between

                border-b

                border-[#232323]

                pb-4

              "

              >

                <span>

                  {item}

                </span>

                <span>

                  ⬜

                </span>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}