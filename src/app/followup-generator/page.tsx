"use client";

import { useState } from "react";

export default function FollowupGeneratorPage() {

  const [name, setName] = useState("");

  const [company, setCompany] = useState("");

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  async function generate() {

    setLoading(true);

    setResult("");

    try {

      const response = await fetch(

        "/api/followup-generator",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          body: JSON.stringify({

            name,

            company,

          }),

        }

      );

      const data =

        await response.json();

      setResult(

        data.message

      );

    }

    catch(error){

      console.log(error);

    }

    setLoading(false);

  }

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        <p className="text-[#60899B]">

          AI Assistant

        </p>

        <h1

          className="

          text-5xl

          font-black

          bg-gradient-to-r

          from-[#F2EDEA]

          via-[#60899B]

          to-[#285C70]

          bg-clip-text

          text-transparent

          mb-10

        "

        >

          🤖 Follow-up Generator

        </h1>

        <div className="space-y-6">

          <input

            className="w-full p-4 rounded-2xl bg-[#111111] border border-[#232323]"

            placeholder="Lead Name"

            value={name}

            onChange={(e)=>

              setName(

                e.target.value

              )

            }

          />

          <input

            className="w-full p-4 rounded-2xl bg-[#111111] border border-[#232323]"

            placeholder="Company"

            value={company}

            onChange={(e)=>

              setCompany(

                e.target.value

              )

            }

          />

          <button

            onClick={generate}

            className="bg-[#1C3E4E] px-6 py-3 rounded-2xl"

          >

            {

              loading

              ? "Generating..."

              : "✨ Generate"

            }

          </button>

          {

            result && (

              <div

                className="

                bg-[#111111]

                border

                border-[#232323]

                rounded-3xl

                p-8

              "

              >

                <pre className="whitespace-pre-wrap">

                  {result}

                </pre>

              </div>

            )

          }

        </div>

      </div>

    </main>

  );

}