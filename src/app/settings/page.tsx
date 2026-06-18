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

  Dynamic plan information coming soon

</p>

<p>

  View your billing page for details

</p>

          </div>

          <div className="border rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-4">

              💳 Billing & Upgrade

            </h2>

            <div className="flex gap-4">

  <Link

    href="/upgrade"

    className="border px-6 py-3 rounded inline-block"

  >

    View Plans

  </Link>

  <Link

    href="/billing"

    className="border px-6 py-3 rounded inline-block"

  >

    💳 Billing

  </Link>

</div>

          </div>

        </div>

      </div>

    </main>

  );

}