import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.json({
  //   hello:"test"
  // })
  console.log(request.nextUrl.pathname);
  
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    let token = request.cookies.get("token");
    console.log(token);
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  const response = NextResponse.next();
  return response;
}
