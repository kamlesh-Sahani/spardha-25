"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file:File,teamID:number) {
  try {

    if (!file) {
      throw new Error("No file uploaded.");
    }

    // Convert the file to a buffer
    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      { folder: `spardha/team-${teamID}` }
    );

    // Return the secure URL
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}