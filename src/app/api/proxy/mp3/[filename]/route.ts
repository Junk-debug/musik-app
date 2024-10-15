import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
  // const targetUrl = `https://dl01.dtmp3.pw/mp3/${filename}`;
  const targetUrl =
    "https://cdn6.sefon.pro/prev/1JDRXRizwTowpPyonViu1Q/1729059387/152/%D0%9D%D0%B5%D1%80%D0%B2%D1%8B%20-%20%D0%9D%D0%B5%D1%80%D0%B2%D1%8B%20%28192kbps%29.mp3";

  const rangeHeader = req.headers.get("range");
  const fetchOptions = {
    headers: {
      Range: rangeHeader || "",
      Referer: "https://musik-app-green.vercel.app",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    },
  };

  try {
    const fetchRes = await fetch(targetUrl, fetchOptions);

    if (!fetchRes.ok) {
      return new NextResponse(
        "Failed to fetch audio file" + JSON.stringify(fetchRes),
        { status: 500 }
      );
    }

    const responseHeaders = new Headers(fetchRes.headers);
    responseHeaders.set(
      "Content-Disposition",
      `inline; filename="${filename}"`
    );
    responseHeaders.set("Content-Type", "audio/mpeg");

    return new NextResponse(fetchRes.body, {
      status: fetchRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error fetching audio file:", error);
    return new NextResponse("Internal Server Error" + JSON.stringify(error), {
      status: 500,
    });
  }
}
