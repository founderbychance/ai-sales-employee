import Link from "next/link";

export default function SettingsPage() {

  return (

    <main className="min-h-screen p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">

          ⚙️ Settings

        </h1>

        <div className="space-y-6">

          <div className="border rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-4">

              👤 Account

            </h2>

            <p>

              Manage your LeadsHijack AI account.

            </p>

          </div>

          <div className="border rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-4">

              📦 Current Plan

            </h2>

            <p>

              Free Plan

            </p>

            <p>

              5 leads/month

            </p>

          </div>

          <div className="border rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-4">

              🚀 Upgrade

            </h2>

            <Link

              href="/upgrade"

              className="border px-6 py-3 rounded inline-block"

            >

              View Plans

            </Link>

          </div>

        </div>

      </div>

    </main>

  );

}