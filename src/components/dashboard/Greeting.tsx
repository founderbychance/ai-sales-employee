export default function Greeting() {

  const hour =

    new Date()

    .getHours();

  let greeting =

    "Good evening";

  if (hour < 12) {

    greeting =

      "Good morning";

  }

  else if (

    hour < 18

  ) {

    greeting =

      "Good afternoon";

  }

  return (

    <div

      className="

      mb-10

    "

    >

      <h1

        className="

        text-5xl

        font-black

      "

      >

        👋 {greeting}

      </h1>

      <p

        className="

        text-gray-400

        mt-4

      "

      >

        Welcome back to

        SalesPilotAI

      </p>

    </div>

  );

}