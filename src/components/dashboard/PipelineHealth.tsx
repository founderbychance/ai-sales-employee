export default function PipelineHealth() {

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

        mb-6

      "

      >

        📊 Pipeline Health

      </h2>

      <div className="space-y-4">

        <p>

          🟢 Healthy

        </p>

        <p>

          🟡 Needs attention

        </p>

        <p>

          🔴 Overdue

        </p>

      </div>

    </div>

  );

}