// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   const { prompt } = await req.json();

//   // return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
// };

import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json(
        { error: "Image required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      "Describe this image in detail",
    ]);

    const response = await result.response;

    return NextResponse.json({ result: response.text() });
  } catch (error) {
    console.error("CAPTION ERROR:", error);
    return NextResponse.json(
      { error: "Caption failed" },
      { status: 500 }
    );
  }
}


