"use server";
import collegeModel from "@/models/college.model";
import dbConnect from "@/utils/dbConnect.util";


export const allColleges = async () => {
  try {
    await dbConnect();
    const colleges = await collegeModel.find({});
    return {
      colleges: JSON.stringify(colleges),
      success: true,
      message: "successfuly get",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "internal error",
    };
  }
};

