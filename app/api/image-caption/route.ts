// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   const { prompt } = await req.json();

//   // return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
// };

import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
            { text: "Describe this image in detail" },
          ],
        },
      ],
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error("CAPTION ERROR:", error);
    return NextResponse.json({ error: "Caption failed" }, { status: 500 });
  }
}
