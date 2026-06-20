export default function TodayTasks() {

  const tasks = [

    "📞 Call ABC Company",

    "📧 Email XYZ Lead",

    "📅 Follow up with Tesla",

    "⭐ High Priority Lead",

  ];

  return (

    <div

      className="

      bg-[#111111]

      border

      border-[#232323]

      rounded-3xl

      p-8

    "

    >

      <h2

        className="

        text-3xl

        font-bold

        mb-8

      "

      >

        📅 Today's Tasks

      </h2>

      <div className="space-y-4">

        {

          tasks.map(

            (task)=>(

              <div

                key={task}

                className="

                border-b

                border-[#232323]

                pb-4

              "

              >

                {task}

              </div>

            )

          )

        }

      </div>

    </div>

  );

}