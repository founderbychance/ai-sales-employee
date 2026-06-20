"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState } from "react";

export default function MobileNav() {

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (

    <>

      {/* Bottom Navigation */}

      <div

        className="

        md:hidden

        fixed

        bottom-0

        left-0

        right-0

        z-50

        bg-[#111111]

        border-t

        border-[#232323]

        flex

        justify-around

        py-3

      "

      >

        <Link

          href="/"

          className={`

          flex

          flex-col

          items-center

          text-sm

          ${

            pathname === "/"

            ? "text-[#60899B]"

            : "text-white"

          }

        `}

        >

          <span>🏠</span>

          <span>Home</span>

        </Link>

        <Link

          href="/dashboard"

          className={`

          flex

          flex-col

          items-center

          text-sm

          ${

            pathname === "/dashboard"

            ? "text-[#60899B]"

            : "text-white"

          }

        `}

        >

          <span>📊</span>

          <span>Dashboard</span>

        </Link>

        <Link

          href="/leads"

          className={`

          flex

          flex-col

          items-center

          text-sm

          ${

            pathname === "/leads"

            ? "text-[#60899B]"

            : "text-white"

          }

        `}

        >

          <span>👥</span>

          <span>Leads</span>

        </Link>

        <button

          onClick={() =>

            setOpen(

              !open

            )

          }

          className="

          flex

          flex-col

          items-center

          text-sm

        "

        >

          <span>☰</span>

          <span>More</span>

        </button>

      </div>

      {/* Popup Menu */}

      {

        open && (

          <div

            className="

            md:hidden

            fixed

            bottom-24

            right-4

            w-64

            bg-[#111111]

            border

            border-[#232323]

            rounded-3xl

            p-5

            shadow-2xl

            z-50

          "

          >

            <div className="flex flex-col gap-4">

              <Link href="/analytics">

                📈 Analytics

              </Link>

              <Link href="/calendar">

                📅 Calendar

              </Link>

              <Link href="/notifications">

                🔔 Notifications

              </Link>

              <Link href="/email-generator">

                🤖 AI Email

              </Link>

              <Link href="/lead-insights">

                🧠 Insights

              </Link>

              <Link href="/followup-generator">

                ✨ Follow-up

              </Link>

              <Link href="/billing">

                💳 Billing

              </Link>

              <Link href="/settings">

                ⚙️ Settings

              </Link>

              <Link href="/admin">

                🛠️ Admin

              </Link>

            </div>

          </div>

        )

      }

    </>

  );

}