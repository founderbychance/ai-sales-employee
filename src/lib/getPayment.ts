import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export async function getPayments() {

  const { userId } = await auth();

  if (!userId) {

    return [];

  }

  const { data } = await supabase

    .from("payments")

    .select("*")

    .eq("user_id", userId)

    .order(

      "created_at",

      {

        ascending: false,

      }

    );

  return data || [];

}