import { oauth2Client }

from "@/lib/google";

import { auth } from "@clerk/nextjs/server";

import { supabase } from "@/lib/supabase";

import { google } from "googleapis";

export async function GET(

  req: Request

) {

  try {

    const { userId } =

      await auth();

    if (!userId) {

      return Response.redirect(

        new URL(

          "/",

          req.url

        )

      );

    }

    const { searchParams } =

      new URL(req.url);

    const code =

      searchParams.get(

        "code"

      );

    if (!code) {

      return Response.redirect(

        new URL(

          "/gmail",

          req.url

        )

      );

    }

    const { tokens } =

      await oauth2Client

      .getToken(code);

    oauth2Client

      .setCredentials(tokens);

    const oauth2 =

      google.oauth2({

        auth:

        oauth2Client,

        version:"v2",

      });

    const { data } =

      await oauth2

      .userinfo

      .get();

    await supabase

      .from(

        "gmail_connections"

      )

      .upsert([

        {

          user_id:

            userId,

          email:

            data.email,

          access_token:

            tokens.access_token,

          refresh_token:

            tokens.refresh_token,

        },

      ]);

    return Response.redirect(

      new URL(

        "/gmail",

        req.url

      )

    );

  }

  catch(error) {

    console.log(error);

    return Response.redirect(

      new URL(

        "/gmail",

        req.url

      )

    );

  }

}