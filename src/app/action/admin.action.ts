"use server";

import AdminModel from "@/models/admin.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyAdmin = async (password: string) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const jwtSecret = process.env.JWT_SECRET;

    if (!email || !password || !jwtSecret) {
      return {
        success: false,
        message: "Unauthorized admin",
      };
    }

    // Find admin by email
    const admin = await AdminModel.findOne({ email }).select("+password");
    if (!admin) {
      return {
        success: false,
        message: "Admin not found",
      };
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    // Generate JWT Token
    const token = jwt.sign({ email: admin.email, role: "admin" }, jwtSecret, {
      expiresIn: "7d",
    });

    const cookieStore  = await cookies();
    // Set the token in a secure HttpOnly cookie
    cookieStore.set("admin-token", token, {
      httpOnly: true, // Prevents client-side access
      maxAge: 7 * 24 * 60 * 60, // 7 day
    });

    return {
      success: true,
      message: "Admin login successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
};
