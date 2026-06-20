"use client";

export default function ConnectGmailButton() {

  async function connectGmail() {

    try {

      const response = await fetch(

        "/api/gmail/connect"

      );

      const data = await response.json();

      window.location.href = data.url;

    }

    catch(error){

      console.log(

        "Gmail error:",

        error

      );

    }

  }

  return (

    <button

      onClick={connectGmail}

      className="

      border

      border-[#353535]

      hover:border-[#60899B]

      px-5

      py-3

      rounded-2xl

      transition-all

      duration-300

      "

    >

      🔗 Connect Gmail

    </button>

  );

}