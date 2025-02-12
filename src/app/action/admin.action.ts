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
    const token = jwt.sign({ email: admin.email, role: "admin",active:admin.active }, jwtSecret, {
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
    if(!password || !mail || !role){
      return{
        message:"please fill the all fields",
        success:false
      }
    }
    const isExist  = await adminModel.findOne({email:mail});
    if(isExist){
      return{
        message:"Role already register",
        success:false
      }
    }

    const admin = await adminModel.create({
      password,
      email:mail,
      role
    })

    if(!admin){
      return{
        message:"Failed to role registered",
        success:false
      }
    }
    return{
      message:"Admin successfuly registered",
      success:true
    }
  } catch (error:any) {
    return{
      message:error.message ||"internal error",
      success:false
    }
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

export const adminLogout = async ()=>{
  try{
    const cookieStore = await cookies();
    cookieStore.delete("admin-token");
    return {
      success: true,
      message: "Admin Logout successfully",
    };

  }catch(error:any){
    return {
      success:false,
      message:error.message || "internal error"
    }
  }
}


export const adminProfile = async()=>{
  try{
    const cookieStore = await cookies();

    const token = cookieStore.get("admin-token")?.value;
    if(!token){
      return{
        success:false,
        message:"unauthenticated user"
      }
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET!)
    if(!decoded){
      return{
        success:false,
        message:"unauthenticated user"
      }
    }
    return {
      success: true,
      message: "Admin found successfully",
      admin:JSON.stringify(decoded)
    };

  }catch(error:any){
    return {
      success:false,
      message:error.message || "internal error"
    }
  }
}