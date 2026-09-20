import { NextRequest, NextResponse } from "next/server";

// Capture the guest's token wherever it shows up — in the path
// (/rsvp/<token>, /overnight/<token>) or as a query param on ANY page,
// including a bare home-page link like yoursite.com/?t=<token>. Either
// way it lands in a cookie once, and every page's nav reads that cookie
// from then on — no page is special-cased as "the" entry point.
const TOKEN_RE = /^[a-f0-9]{24}$/;

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  let token: string | null = null;

  const pathMatch = pathname.match(/^\/(?:rsvp|overnight)\/([a-f0-9]{24})$/);
  if (pathMatch) token = pathMatch[1];

  const queryToken = searchParams.get("t");
  if (!token && queryToken && TOKEN_RE.test(queryToken)) token = queryToken;

  if (!token) return NextResponse.next();

  const response = NextResponse.next();
  response.cookies.set("guest_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};