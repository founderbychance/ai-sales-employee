"use client";

import { useState } from "react";

export default function ImportPage() {

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function uploadCSV() {

    if (!file) {

      alert("Select a CSV file");

      return;

    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append(

        "file",

        file

      );

      const response = await fetch(

        "/api/import",

        {

          method: "POST",

          body: formData,

        }

      );

      const data =

        await response.json();

      if (!response.ok) {

        alert(

          data.message

        );

        setLoading(false);

        return;

      }

      alert(

        `✅ ${data.count} leads imported`

      );

    }

    catch(error) {

      console.log(error);

      alert(

        "Import failed"

      );

    }

    setLoading(false);

  }

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-4xl mx-auto">

        <p className="text-[#60899B]">

          Integrations

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

          📥 CSV Import

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

          <input

            type="file"

            accept=".csv"

            onChange={(e)=>

              setFile(

                e.target.files?.[0]

                || null

              )

            }

          />

          <button

            onClick={uploadCSV}

            disabled={loading}

            className="

            mt-8

            bg-[#1C3E4E]

            hover:bg-[#285C70]

            px-6

            py-4

            rounded-2xl

          "

          >

            {

              loading

              ?

              "Importing..."

              :

              "📥 Import Leads"

            }

          </button>

          <div className="mt-8">

  <p className="text-gray-400">

    CSV format:

  </p>

  <div

    className="

    mt-4

    bg-[#0A0F14]

    border

    border-[#232323]

    rounded-2xl

    p-4

    font-mono

    text-sm

  "

  >

    name,email,phone,company

    <br />

    John Doe,john@gmail.com,9876543210,Google

    <br />

    Jane Smith,jane@gmail.com,9123456789,Microsoft

  </div>

</div>

        </div>

      </div>

    </main>

  );

}