import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

export async function getProfile() {

  const { userId } = await auth();

  if (!userId) {

    return null;

  }

  const { data } = await supabase

    .from("profiles")

    .select("*")

    .eq("user_id", userId)

    .single();

  return data;

}