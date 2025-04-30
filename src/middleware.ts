import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  console.log(`🚀 ~ middleware ~ host:`, host);
  const url = request.nextUrl.clone();

  if (host === "textify-art.vercel.app") {
    url.hostname = "textify.torktoo.com";
    url.protocol = "https";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
