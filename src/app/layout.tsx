import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadsHijack AI",
  description: "AI-powered lead qualification platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <ClerkProvider>

      <html lang="en">

        <body className="bg-white text-black">

          <nav className="border-b p-5">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

              <h1 className="font-bold text-2xl">

                LeadsHijack AI

              </h1>

              <div className="flex flex-wrap gap-4 md:gap-8">

                <Link
                  href="/"
                  className="hover:underline"
                >

                  🏠 Home

                </Link>

                <Link
                  href="/dashboard"
                  className="hover:underline"
                >

                  📊 Dashboard

                </Link>

                <Link
                  href="/leads"
                  className="hover:underline"
                >

                  👥 Leads

                </Link>

                <Link
                  href="/kanban"
                  className="hover:underline"
                >

                  📋 Kanban

                </Link>

              </div>

            </div>

          </nav>

          {children}

        </body>

      </html>

    </ClerkProvider>

  );

}