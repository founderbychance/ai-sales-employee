"use client";

import { useState } from "react";

import ConnectGmailButton from "./ConnectGmailButton";

export default function EmailGenerator({

  leads,

}: any) {

  const [emails, setEmails] = useState<any>({});

  const [loading, setLoading] = useState("");

  async function generateEmail(lead:any) {

    setLoading(lead.id);

    try {

      const response = await fetch(

        "/api/generate-email",

        {

          method: "POST",

          headers: {

            "Content-Type":

            "application/json",

          },

          body: JSON.stringify({

            name: lead.name,

            company: lead.company,

            email: lead.email,

          }),

        }

      );

      const data = await response.json();

      setEmails(

        (prev:any)=>({

          ...prev,

          [lead.id]: data,

        })

      );

    }

    catch(error){

      console.log(error);

    }

    setLoading("");

  }

  async function copyEmail(

    leadId:string

  ) {

    const email = emails[leadId];

    if (!email) return;

    await navigator.clipboard.writeText(

`Subject:

${email.subject}

${email.body}`

    );

    alert("📋 Copied");

  }

  return (

    <div className="space-y-8">

      {

        leads.map((lead:any)=>(

          <div

            key={lead.id}

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

              text-2xl

              font-bold

            "

            >

              {lead.name}

            </h2>

            <p>

              🏢 {lead.company}

            </p>

            <p>

              📧 {lead.email}

            </p>

            <div className="flex flex-wrap gap-4 mt-6">

  <button

    onClick={()=>

      generateEmail(lead)

    }

    className="

    bg-[#1C3E4E]

    px-5

    py-3

    rounded-2xl

  "

  >

    {

      loading===lead.id

      ? "Generating..."

      : "🤖 Generate"

    }

  </button>

  {

    emails[lead.id]

    &&

    <button

      onClick={()=>

        copyEmail(

          lead.id

        )

      }

      className="

      border

      border-[#353535]

      px-5

      py-3

      rounded-2xl

    "

    >

      📋 Copy

    </button>

    

  }

  {

emails[lead.id]

&&

<button

className="

border

border-[#353535]

px-5

py-3

rounded-2xl

"

>

📧 Send Gmail

</button>

}

  <ConnectGmailButton />

</div>

            {

              emails[lead.id]

              && (

                <div

                  className="

                  mt-6

                  bg-[#0A0F14]

                  rounded-2xl

                  p-6

                "

                >

                  <h3

                    className="

                    font-bold

                    mb-4

                  "

                  >

                    📌 Subject

                  </h3>

                  <p>

                    {

                      emails[lead.id]

                      .subject

                    }

                  </p>

                  <h3

                    className="

                    font-bold

                    mt-6

                    mb-4

                  "

                  >

                    📧 Body

                  </h3>

                  <p className="whitespace-pre-wrap">

                    {

                      emails[lead.id]

                      .body

                    }

                  </p>

                </div>

              )

            }

          </div>

        ))

      }

    </div>

  );

}