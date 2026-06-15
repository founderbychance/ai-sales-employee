import { gemini } from "@/lib/gemini";

export async function GET() {
  return Response.json({
    message: "AI route is working",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Score this business lead from 1-10.

Name: ${body.name}

Company: ${body.company}

Return JSON only:

{
  "score": 8,
  "reason": "Short explanation"
}
`;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return Response.json({
      result: response.text,
    });

  } catch (error) {

    return Response.json(
      {
        message: "AI scoring failed",
      },
      {
        status: 500,
      }
    );
  }
}