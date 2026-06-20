"use client";

import { useState } from "react";

export default function AICopilot() {

  const [prompt, setPrompt] =

    useState("");

  const [answer, setAnswer] =

    useState("");

  const [loading, setLoading] =

    useState(false);

  async function askAI() {

    if (!prompt) return;

    setLoading(true);

    const response =

      await fetch(

        "/api/copilot",

        {

          method:"POST",

          headers:{

            "Content-Type":

            "application/json",

          },

          body: JSON.stringify({

            prompt,

          }),

        }

      );

    const data =

      await response.json();

    setAnswer(

      data.answer

    );

    setLoading(false);

  }

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

        mb-6

      "

      >

        🤖 AI Copilot

      </h2>

      <div className="flex flex-wrap gap-3 mb-6">

  {[

    "Who should I call today?",

    "Show hot leads",

    "Summarize my pipeline",

    "Show overdue tasks",

  ].map(

    (item)=>(

      <button

        key={item}

        onClick={()=>

          setPrompt(item)

        }

        className="

        border

        border-[#353535]

        px-4

        py-2

        rounded-2xl

      "

      >

        {item}

      </button>

    )

  )}

</div>

<div className="flex flex-wrap gap-3 mb-8">

  {[

    "Who should I call today?",

    "Show hot leads",

    "Summarize my pipeline",

    "Show overdue tasks",

  ].map(

    (item)=>(

      <button

        key={item}

        onClick={()=>

          setPrompt(item)

        }

        className="

        border

        border-[#353535]

        hover:border-[#60899B]

        px-4

        py-2

        rounded-2xl

        transition-all

      "

      >

        {item}

      </button>

    )

  )}

</div>

      <input

        value={prompt}

        onChange={(e)=>

          setPrompt(

            e.target.value

          )

        }

        placeholder="Ask AI..."

        className="

        w-full

        bg-[#0A0F14]

        border

        border-[#232323]

        rounded-2xl

        p-4

      "

      />

      <button

        onClick={askAI}

        disabled={loading}

        className="

        mt-6

        bg-[#1C3E4E]

        hover:bg-[#285C70]

        px-6

        py-3

        rounded-2xl

      "

      >

        {

          loading

          ?

          "Thinking..."

          :

          "🚀 Ask AI"

        }

      </button>

      {

        answer && (

          <div

            className="

            mt-8

            bg-[#0A0F14]

            rounded-2xl

            p-6

          "

          >

            {answer}

          </div>

        )

      }

    </div>

  );

}