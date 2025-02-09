import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { adminProfile } from "./app/action/admin.action";
export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const adminAuthToken = cookiesStore.get("admin-token")?.value;
  const res = await adminProfile();
 
  const protectedRoutes = ["/admin","/api/report"];
 
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!adminAuthToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if(request.nextUrl.pathname.startsWith("/login")){
    if(adminAuthToken){
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }



//   if (
//     withoutLoginRoute.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     )
//   ) {
//     if (authToken) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/report/:path*","/login", "/register", "/api/:path*","/admin/:path*"],
};
