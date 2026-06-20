import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export default async function NotificationBadge() {

  const { userId } = await auth();

  if (!userId) return null;

  const { count } = await supabase

    .from("notifications")

    .select("*", {

      count: "exact",

      head: true,

    })

    .eq("user_id", userId)

    .eq("is_read", false);

  if (!count) return null;

  return (

    <span

      className="

      ml-2

      bg-red-500

      text-xs

      px-2

      py-1

      rounded-full

      text-white

    "

    >

      {count}

    </span>

  );

}
