import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const urlParam = searchParams.get("url");

  if (!urlParam) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const targetUrl = decodeURIComponent(urlParam);

  const fileName = new URL(urlParam).pathname.split("/").pop();

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
      `inline; filename="${encodeURIComponent(fileName || "audio.mp3")}"`
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
