export default function SetupChecklist() {

  const items = [

    "🏢 Create Workspace",

    "👥 Add Team",

    "📥 Import Leads",

    "📧 Connect Gmail",

    "💬 Connect WhatsApp",

    "🚀 Upgrade Plan",

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

        🚀 Getting Started

      </h2>

      <div className="space-y-4">

        {

          items.map(

            (item)=>(

              <p key={item}>

                {item}

              </p>

            )

          )

        }

      </div>

    </div>

  );

}