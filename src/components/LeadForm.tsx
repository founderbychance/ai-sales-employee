"use client";

import { useState } from "react";

export default function LeadForm() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

const [company, setCompany] = useState("");

const [loading, setLoading] = useState(false);

  async function handleSubmit(
  e: React.FormEvent
) {

  try {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const response = await fetch(

      "/api/leads",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

        },

        body: JSON.stringify({

          name,

          email,

          company,

        }),

      }

    );

    const data =

      await response.json();

    if (response.status === 403) {

      const shouldUpgrade =

        confirm(

          "🚫 You have reached your free plan limit.\n\nGo to the Upgrade page?"

        );

      if (shouldUpgrade) {

        window.location.href =

          "/upgrade";

      }

      setLoading(false);

return;

    }

    alert(data.message);

setName("");

setEmail("");

setCompany("");

setLoading(false);

} catch (error) {

  console.log(error);

  alert("Something went wrong");

  setLoading(false);

}

}

  return (

    <form

      onSubmit={handleSubmit}

      className="flex flex-col gap-4 w-full max-w-md"

    >

      <input

        className="border p-3 rounded"

        placeholder="Name"

        value={name}

        onChange={(e) =>

          setName(e.target.value)

        }

        required

      />

      <input

        className="border p-3 rounded"

        placeholder="Email"

        type="email"

        value={email}

        onChange={(e) =>

          setEmail(e.target.value)

        }

        required

      />

      <input

        className="border p-3 rounded"

        placeholder="Company"

        value={company}

        onChange={(e) =>

          setCompany(e.target.value)

        }

      />

      <button

  className="bg-black text-white p-3 rounded disabled:opacity-50"

  type="submit"

  disabled={loading}

>

  {

    loading

      ? "Submitting..."

      : "Submit"

  }

</button>

    </form>

  );

}