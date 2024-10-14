import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/proxy/mp3/")) {
    const filename = url.pathname.split("/").pop();
    const targetUrl = `https://dl01.dtmp3.pw/mp3/${filename}`;

    const rangeHeader = req.headers.get("range");
    const fetchOptions = rangeHeader
      ? {
          headers: {
            Range: rangeHeader,
          },
        }
      : {};

    try {
      const fetchRes = await fetch(targetUrl, fetchOptions);

      if (!fetchRes.ok) {
        return new NextResponse("Failed to fetch audio file", { status: 500 });
      }

      const responseHeaders = new Headers(fetchRes.headers);
      if (fetchRes.status === 206) {
        responseHeaders.set(
          "Content-Disposition",
          `inline; filename="${filename}"`
        );
        responseHeaders.set("Content-Type", "audio/mpeg");
      }

      return new NextResponse(fetchRes.body, {
        status: fetchRes.status,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  return NextResponse.next();
}
