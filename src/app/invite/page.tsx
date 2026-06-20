"use client";

import { useState } from "react";

export default function InvitePage() {

  const [email, setEmail] = useState("");

  const [role, setRole] = useState("member");

  const [loading, setLoading] = useState(false);

  async function sendInvite() {

    if (!email) {

      alert("Enter an email");

      return;

    }

    setLoading(true);

    try {

      const response = await fetch(

        "/api/invite",

        {

          method: "POST",

          headers: {

            "Content-Type":

            "application/json",

          },

          body: JSON.stringify({

            email,

            role,

          }),

        }

      );

      const data = await response.json();

      if (response.ok) {

        alert("✅ Invite sent");

        setEmail("");

        setRole("member");

      }

      else {

        alert(

          data.message ||

          "Something went wrong"

        );

      }

    }

    catch(error) {

      console.log(error);

      alert("Server error");

    }

    setLoading(false);

  }

  return (

    <main className="min-h-screen p-6 md:p-10">

      <div className="max-w-4xl mx-auto">

        <p className="text-[#60899B]">

          Workspace

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

          📨 Invite Member

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

                Email

              </p>

              <input

                type="email"

                value={email}

                onChange={(e)=>

                  setEmail(

                    e.target.value

                  )

                }

                placeholder="john@company.com"

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

                Role

              </p>

              <select

                value={role}

                onChange={(e)=>

                  setRole(

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

                <option value="member">

                  Member

                </option>

                <option value="manager">

                  Manager

                </option>

                <option value="admin">

                  Admin

                </option>

              </select>

            </div>

            <button

              onClick={sendInvite}

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

                ? "Sending..."

                : "📨 Send Invite"

              }

            </button>

          </div>

        </div>

      </div>

    </main>

  );

}