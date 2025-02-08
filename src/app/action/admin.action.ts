"use server";

import adminModel from "@/models/admin.model";
import dbConnect from "@/utils/dbConnect.util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const adminLogin = async (password: string,mail:string) => {
  try {
    await dbConnect();
    const email = mail || process.env.ADMIN_EMAIL;
    const jwtSecret = process.env.JWT_SECRET;

    if (!email || !password || !jwtSecret) {
      return {
        success: false,
        message: "Unauthorized admin",
      };
    }

    // Find admin by email
    const admin = await adminModel.findOne({ email }).select("+password");
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
export const adminRegister  = async (password?:string,mail?:string,role?:"admin"|"user")=>{
  try {
    await dbConnect();
    const admin = await adminModel.create({
      password:"a@HICIX123",
      email:"spardha.dbit@gmail.com",
      role:"admin"
    })

    if(!admin){
      console.log("faied") 
      return;
    }
    console.log("successful")
  } catch (error) {
    console.log(error,"admin register error");
  }
}

export const allAdmin = async()=>{
  try{
    await dbConnect();
    const admins = await adminModel.find({});
    return{
      message:"successfuly find",
      admins:JSON.stringify(admins)
    }
  }catch(error:any){
    return {
      success:false,
      message:error.message ||"internal error"
    }
  }
}


export const adminStatus = async(adminId:string,status:boolean)=>{
  try{
    await dbConnect();
    const admin = await adminModel.findById(adminId);
    if(!admin){
      return{
        success:false,
        message:"Admin is not found",
      }
    }
    if(admin.active==status){
      return{
        success:false,
        message:`Admin is already ${status?"Active":"Disabled"}`,
      }
    }
    admin.active=status;
    await admin.save({validateBeforeSave:true});
    return{
      success:true,
      message:`Admin is succuessfuly  ${status?"Active":"Disabled"}`
    }
  }catch(error:any){
    return {
      success:false,
      message:error.message ||"internal error"
    }
  }
}

export const adminRole = async(adminId:string,role:"user"|"admin")=>{
  try{
    await dbConnect();
    const admin = await adminModel.findById(adminId);
    if(!admin){
      return{
        success:false,
        message:"Admin is not found",
      }
    }
    if(admin.role==role){
      return{
        success:false,
        message:`role is already ${role}`,
      }
    }
    admin.role=role;
    await admin.save({validateBeforeSave:true});
    return{
      success:true,
      message:`role is succuessfuly  ${role}`
    }
  }catch(error:any){
    return {
      success:false,
      message:error.message ||"internal error"
    }
  }
}

