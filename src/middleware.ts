import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  let admin;

  try {
    // Fetch the admin data
    const response = await fetch("/api/admin");

    // Ensure the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch admin data");
    }

    const data = await response.json();
    console.log(data, "admin");
    admin = data.admin;
 
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
        return NextResponse.redirect(new URL("https://spardha-25.vercel.app/admin/dashboard", request.url));
    }
  }
} catch (error) {
  console.error("Error fetching admin data:", error);
  return NextResponse.redirect(new URL("/login", request.url));
}

  return NextResponse.next();
}
export const config = {
  matcher: ["/report/:path*","/login", "/register", "/api/:path*","/admin/:path*"],
};
