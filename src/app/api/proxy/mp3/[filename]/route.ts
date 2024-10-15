import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
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

    // if (!fetchRes.ok) {
    //   return new NextResponse(
    //     "Failed to fetch audio file" + JSON.stringify(fetchRes),
    //     { status: 500 }
    //   );
    // }

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
