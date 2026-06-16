import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadPilot AI",
  description: "AI-powered lead qualification platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        <nav className="border-b p-5">

          <div className="flex gap-8 items-center">

            <h1 className="font-bold text-2xl">

              LeadPilot AI

            </h1>

            <Link href="/">

              🏠 Home

            </Link>

            <Link href="/dashboard">

              📊 Dashboard

            </Link>

            <Link href="/leads">

              👥 Leads

            </Link>

          </div>

        </nav>

        {children}

      </body>

    </html>

  );

}