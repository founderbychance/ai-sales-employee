import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name: body.name,
          email: body.email,
          company: body.company,
        },
      ])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return Response.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      message: "Lead saved successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}