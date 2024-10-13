import { NextResponse } from "next/server";
import * as deepl from "deepl-node";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY || "");

export async function POST(request: Request) {
  const { text, targetLang } = await request.json();

  try {
    const result = await translator.translateText(text, null, targetLang, {
      preserveFormatting: true,
    });
    return NextResponse.json({
      translatedText: "text" in result ? result.text : result[0].text,
    });
  } catch (error) {
    console.error("Error translating text:", error);
    return NextResponse.json(
      { error: "Error translating text: " },
      { status: 500 }
    );
  }
}
