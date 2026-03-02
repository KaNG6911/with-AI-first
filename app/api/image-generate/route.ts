// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   const { prompt } = await req.json();

//   return NextResponse.json({ result: "daraa ni ooroo soli" });
// };

import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(apiKey)

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: 'imagen-3.0-generate-001',
    })

    const result = await model.generateContent(prompt)
    const response = await result.response

    // Imagen base64 image буцаана
    const base64Image =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data

    if (!base64Image) {
      return NextResponse.json(
        { error: 'Image generation failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ image: base64Image })
  } catch (error) {
    console.error('IMAGE GEN ERROR:', error)
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    )
  }
}
