// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   try {
//     return NextResponse.json({ result: "daraa ni ooroo soli" });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
