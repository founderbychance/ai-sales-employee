import Link from "next/link";

export default function NotFound() {

return (

<main

className="

min-h-screen

flex

flex-col

items-center

justify-center

gap-6

"

>

<h1

className="

text-7xl

font-black

"

>

404

</h1>

<p>

Page not found

</p>

<Link

href="/"

className="

bg-[#1C3E4E]

px-6

py-3

rounded-2xl

"

>

🏠 Home

</Link>

</main>

);

}