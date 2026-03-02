// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   try {
//     return NextResponse.json({ result: "daraa ni ooroo soli" });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({ result: response.text() });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}


