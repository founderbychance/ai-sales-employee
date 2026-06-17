import Link from "next/link";

export default function UserStats() {

  return (

    <div className="border rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">

        👤 Account

      </h2>

      <div className="space-y-3">

        <p>

          📦 Plan: Free

        </p>

        <p>

          📊 Lead Limit: 5/month

        </p>

        <p>

          🚀 Ready to scale?

        </p>

      </div>

      <Link

        href="/upgrade"

        className="border px-4 py-2 rounded inline-block mt-6"

      >

        Upgrade Plan

      </Link>

    </div>

  );

}