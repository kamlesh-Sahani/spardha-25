import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
export async function middleware(request: NextRequest) {
  const {data} = await axios.get("api/admin");
  console.log(data,"admin")
  const admin = data.admin;
  const protectedRoutes = ["/admin","/api/report"];
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!data.success || !admin.email || !admin.active) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if(request.nextUrl.pathname.startsWith("/login")){
    if(data.success && admin.email ){
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/report/:path*","/login", "/register", "/api/:path*","/admin/:path*"],
};
