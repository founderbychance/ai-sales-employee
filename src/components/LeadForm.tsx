"use client";

import { useState } from "react";

import NotificationBar from "@/components/NotificationBar";

export default function LeadForm() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [company, setCompany] = useState("");

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [showNotification, setShowNotification] =

    useState(false);

  const [notificationMessage, setNotificationMessage] =

    useState("");

  const [notificationType, setNotificationType] =

    useState<

      "success" |

      "error" |

      "info"

    >("info");

  async function handleSubmit(

    e: React.FormEvent

  ) {

    try {

      e.preventDefault();

      if (loading) return;

      setLoading(true);

      const response = await fetch(

        "/api/leads",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          body: JSON.stringify({

  name,

  email,

  company,

  phone,

}),
          

        }

      );

      const data =

        await response.json();

        if (

  !response.ok &&

  response.status !== 403

) {

  setNotificationType(

    "error"

  );

  setNotificationMessage(

    data.message ||

    "Something went wrong"

  );

  setShowNotification(

    true

  );

  setLoading(false);

  return;

}

      if (response.status === 403) {

        setNotificationType(

          "error"

        );

        setNotificationMessage(

          "🚫 Free plan limit reached. Redirecting..."

        );

        setShowNotification(

          true

        );

        setLoading(false);

        setTimeout(() => {

          window.location.href =

            "/upgrade";

        }, 2000);

        return;

      }

      setNotificationType(

        "success"

      );

      setNotificationMessage(

        "✅ Lead created successfully"

      );

      setShowNotification(

        true

      );

      setName("");

      setEmail("");

      setCompany("");

      setPhone("");

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setNotificationType(

        "error"

      );

      setNotificationMessage(

        "❌ Something went wrong"

      );

      setShowNotification(

        true

      );

      setLoading(false);

    }

  }

  return (

    <>

      <NotificationBar

        show={showNotification}

        message={notificationMessage}

        type={notificationType}

        onClose={() =>

          setShowNotification(

            false

          )

        }

      />

      <form

        onSubmit={handleSubmit}

        className="flex flex-col gap-5 w-full max-w-xl"

      >

        <input

          className="

border

border-[#353535]

bg-[#111111]

text-white

p-4

rounded-2xl

outline-none

focus:border-[#60899B]

focus:ring-2

focus:ring-[#285C70]/40

transition-all

duration-300

"

          placeholder="Name"

          value={name}

          onChange={(e) =>

            setName(

              e.target.value

            )

          }

          required

        />

        <input

          className="

border

border-[#353535]

bg-[#111111]

text-white

p-4

rounded-2xl

outline-none

focus:border-[#60899B]

focus:ring-2

focus:ring-[#285C70]/40

transition-all

duration-300

"

          placeholder="Email"

          type="email"

          value={email}

          onChange={(e) =>

            setEmail(

              e.target.value

            )

          }

          required

        />

        <input

          className="

border

border-[#353535]

bg-[#111111]

text-white

p-4

rounded-2xl

outline-none

focus:border-[#60899B]

focus:ring-2

focus:ring-[#285C70]/40

transition-all

duration-300

"

          placeholder="Company"

          value={company}

          onChange={(e) =>

            setCompany(

              e.target.value

            )

          }

        />

        <input

className="

border

border-[#353535]

bg-[#111111]

text-white

p-4

rounded-2xl

outline-none

focus:border-[#60899B]

focus:ring-2

focus:ring-[#285C70]/40

transition-all

duration-300

"

placeholder="📞 Phone Number"

type="tel"

pattern="^\+?[0-9]{10,15}$"

value={phone}

onChange={(e) =>

  setPhone(

    e.target.value

  )

}

required

/>

        <button

          className="

bg-[#1C3E4E]

hover:bg-[#285C70]

hover:-translate-y-1

hover:shadow-2xl

transition-all

duration-300

text-white

font-semibold

p-4

rounded-2xl

disabled:opacity-50

"

          type="submit"

          disabled={loading}

        >

          {

            loading

? "⏳ Creating Lead..."

: "🚀 Create Lead"
          }

        </button>

      </form>

    </>

  );

}