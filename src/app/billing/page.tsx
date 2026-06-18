import Link from "next/link";

export default function BillingPage() {

  return (

    <main className="min-h-screen p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">

          💳 Billing

        </h1>

        <div className="space-y-8">
            <div className="border rounded-xl p-8">

  <h2 className="text-3xl font-bold mb-4">

    🧾 Payment History

  </h2>

  <p>

    Coming soon

  </p>

</div>

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-4">

              📦 Current Plan

            </h2>

            <p className="text-2xl">

  Dynamic plan information coming soon

</p>

<p className="text-gray-500 mt-2">

  Your current subscription will appear here

</p>

          </div>

          <div className="border rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              🚀 Upgrade

            </h2>

            <div className="flex gap-4 flex-wrap">

              <Link

                href="/upgrade"

                className="border px-6 py-3 rounded"

              >

                View Plans

              </Link>

              <a

  href="mailto:forgegroupofficial@gmail.com?subject=LeadsHijack AI Business Plan"

  className="border px-6 py-3 rounded"

>

                📩 Contact Sales

              </a>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}