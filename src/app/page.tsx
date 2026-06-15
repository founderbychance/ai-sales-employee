import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">

      <h1 className="text-5xl font-bold">
        AI Sales Employee
      </h1>

      <p className="mt-4 mb-10 text-gray-500">
        Capture and qualify leads automatically
      </p>

      <LeadForm />

    </main>
  );
}