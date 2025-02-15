import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  let admin;

  try {
    // Fetch the admin data
    const response = await fetch("https://spardha-25.vercel.app/api/admin",{
      method:"GET",
      credentials:"include"
    });

    // Ensure the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch admin data");
    }

    const data = await response.json();
    console.log(data, "admin");

    // Check if the data is valid and contains admin information
    if (data && data.success && data.admin) {
      admin = data.admin;
    } else {
      throw new Error("Invalid admin data");
    }

    const protectedRoutes = ["/admin", "/api/report"];
    
    // Check for protected routes and ensure proper admin status
    if (
      protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    ) {
      if (!admin.email || !admin.active) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
    
    // Redirect to admin dashboard if already logged in
    if (request.nextUrl.pathname.startsWith("/login")) {
      if (admin.email) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

  } catch (error) {
    console.error("Error fetching admin data:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/report/:path*", "/login", "/register", "/api/:path*", "/admin/:path*"],
};
