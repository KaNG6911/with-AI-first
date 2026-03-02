// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   const { prompt } = await req.json();

//   return NextResponse.json({ result: "daraa ni ooroo soli" });
// };
import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const response = await ai.models.generateImages({
      model: "gemini-3.1-flash-image-preview",
      prompt: prompt,
    });

    const imageBase64 = response.generatedImages?.[0]?.image?.imageBytes;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      image: imageBase64,
    });
  } catch (error: any) {
    console.error("FULL IMAGE ERROR:", error);

    return NextResponse.json(
      { error: error?.message || "Image generation failed" },
      { status: 500 },
    );
  }
}
