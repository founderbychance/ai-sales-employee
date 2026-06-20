import MobileNav from "@/components/MobileNav";

import Sidebar from "@/components/Sidebar";

import Script from "next/script";

import type { Metadata } from "next";

import Link from "next/link";

import HamburgerMenu from "@/components/HamburgerMenu";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

export const metadata: Metadata = {

  title: "SalesPilotAI | AI CRM for Sales Teams",

  description:

    "AI-powered CRM for freelancers, agencies and businesses.",

};

export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <ClerkProvider>

      <html lang="en">

        <body className="bg-[#0A0F14] text-[#F2EDEA] min-h-screen overflow-x-hidden">

          <Script

            src="https://checkout.razorpay.com/v1/checkout.js"

          />

          {/* Background */}

          <div className="fixed inset-0 -z-10 overflow-hidden">

            <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-[#1C3E4E]/20 blur-[120px]" />

            <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-[#285C70]/20 blur-[120px]" />

          </div>

          {/* Navbar */}

          <div

className="

hidden

sticky

top-0

z-50

px-4

py-4

"

>

            <nav className="max-w-7xl mx-auto">

              <div

                className="

                flex

                flex-col

                md:flex-row

                md:items-center

                md:justify-between

                gap-4

                px-8

                py-5

                rounded-3xl

                border

                border-[#353535]

                bg-[#111111]/80

                backdrop-blur-xl

                shadow-2xl

              "

              >

                {/* Logo */}

                <h1

                  className="

                  text-3xl

                  font-black

                  tracking-tight

                  bg-gradient-to-r

                  from-[#60899B]

                  to-[#285C70]

                  bg-clip-text

                  text-transparent

                "

                >

                  <div className="flex items-center gap-3">

<img

src="/logo.png"

alt="SalesPilotAI"

className="h-10 w-10"

/>

<span

className="

text-3xl

font-black

"

>

SalesPilotAI

</span>

</div>

                </h1>

                {/* Navigation */}

                <div

                  className="

                  flex

                  flex-wrap

                  items-center

                  gap-4

                  md:gap-6

                  text-sm

                  font-medium

                "

                >

                  <Link

                    href="/"

                    className="

                    text-[#A7B0B7]

                    hover:text-[#60899B]

                    transition-all

                  "

                  >

                    🏠 Home

                  </Link>

                  <Link

                    href="/dashboard"

                    className="

                    text-[#A7B0B7]

                    hover:text-[#60899B]

                    transition-all

                  "

                  >

                    📊 Dashboard

                  </Link>

                  <Link

                    href="/leads"

                    className="

                    text-[#A7B0B7]

                    hover:text-[#60899B]

                    transition-all

                  "

                  >

                    👥 Leads

                  </Link>

                  <HamburgerMenu />

                </div>

              </div>

            </nav>

          </div>

          <div className="flex">

  <Sidebar />

  <main

    className="

    flex-1

    lg:ml-72

    pb-24

  "

  >

    {children}

  </main>

</div>

          <MobileNav />

        </body>

      </html>

    </ClerkProvider>

  );

}