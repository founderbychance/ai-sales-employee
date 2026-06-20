"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function WorkspaceOnboardingPage() {

  const [name, setName] = useState("");

  const [type, setType] = useState("freelancer");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function createWorkspace() {

  if (!name) {

    alert("Enter workspace name");

    return;

  }

  setLoading(true);

  try {

    const response = await fetch(

      "/api/workspace/create",

      {

        method: "POST",

        headers: {

          "Content-Type":

          "application/json",

        },

        body: JSON.stringify({

          name,

          type,

        }),

      }

    );

    const data =

      await response.json();

    if (!response.ok) {

      alert(

        data.message ||

        "Something went wrong"

      );

      setLoading(false);

      return;

    }

    router.push(

      "/dashboard"

    );

  }

  catch(error) {

    console.log(error);

    alert(

      "Server error"

    );

  }

  setLoading(false);

}

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-3xl mx-auto">

        <p className="text-[#60899B]">

          Welcome

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

          🏢 Create Workspace

        </h1>

        <div

          className="

          bg-[#111111]

          border

          border-[#232323]

          rounded-3xl

          p-8

        "

        >

          <div className="space-y-6">

            <div>

              <p className="mb-3">

                Workspace Name

              </p>

              <input

                value={name}

                onChange={(e)=>

                  setName(

                    e.target.value

                  )

                }

                placeholder="Acme Agency"

                className="

                w-full

                bg-[#0A0F14]

                border

                border-[#232323]

                rounded-2xl

                p-4

              "

              />

            </div>

            <div>

              <p className="mb-3">

                Workspace Type

              </p>

              <select

                value={type}

                onChange={(e)=>

                  setType(

                    e.target.value

                  )

                }

                className="

                w-full

                bg-[#0A0F14]

                border

                border-[#232323]

                rounded-2xl

                p-4

              "

              >

                <option value="freelancer">

                  Freelancer

                </option>

                <option value="startup">

                  Startup

                </option>

                <option value="agency">

                  Agency

                </option>

                <option value="company">

                  Company

                </option>

              </select>

            </div>

            <button

onClick={createWorkspace}

disabled={loading}

              className="

              bg-[#1C3E4E]

              hover:bg-[#285C70]

              px-6

              py-4

              rounded-2xl

              transition-all

              duration-300

            "

            >

              {

loading

? "Creating..."

: "🚀 Continue"

}

            </button>

          </div>

        </div>

      </div>

    </main>

  );

}