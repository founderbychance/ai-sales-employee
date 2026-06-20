"use client";

import { useEffect } from "react";

export default function NotificationBar({

  show,

  message,

  type,

  onClose,

}: {

  show: boolean;

  message: string;

  type: "success" | "error" | "info";

  onClose: () => void;

}) {

  useEffect(() => {

    if (!show) return;

    const timer = setTimeout(

      onClose,

      4000

    );

    return () => clearTimeout(timer);

  }, [show, onClose]);

  if (!show) return null;

  return (

    <div

className={`

fixed

top-6

left-1/2

z-50

-translate-x-1/2

px-8

py-4

rounded-2xl

shadow-2xl

font-semibold

text-white

transition-all

duration-500

animate-slideDown

${
  type === "success"
    ? "bg-[#285C70]"
    : type === "error"
    ? "bg-red-600"
    : "bg-[#60899B]"
}

`}

>

      {message}

    </div>

  );

}