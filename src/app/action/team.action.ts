import TeamModel from "@/models/team.model";
import cloudinary from "@/utils/cloudinary.util";
import generatePassword from "@/utils/generatePassword.util";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import sendMail from "@/utils/sendMail.util";
import teamIdGenerate from "@/utils/teamIdGenerate.util";

// Function to upload an image to Cloudinary
const uploadToCloudinary = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "spardha",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export const registerAction = async (teamData: any) => {
  try {
    const {
      email,
      college,
      event,
      transactionId,
      transactionSs,
      amount,
      files,
      players,
    } = teamData;

    // Basic validation
    if (
      !email ||
      !college ||
      !event ||
      !transactionId ||
      !transactionSs ||
      !amount ||
      !players ||
      players.length === 0
    ) {
      return {
        success: false,
        message: "Please fill all fields and add at least one player.",
      };
    }

    // Check if the team is already registered
    const isExist = await TeamModel.findOne({ email });
    if (isExist) {
      return {
        success: false,
        message: "Team already registered",
      };
    }

    // Validate and upload files to Cloudinary
    if (!files?.transactionSs || !files?.idCardPic) {
      return {
        success: false,
        message: "Missing required image files",
      };
    }

    const transactionSsUrl = await uploadToCloudinary(files.transactionSs[0]);
    const idCardPicUrl = await uploadToCloudinary(files.idCardPic[0]);

    // Dynamically upload each player's ID card images
    const playerIdCardUrls = files?.playerIdCard
      ? await Promise.all(
          files?.playerIdCard?.map((f: any) => uploadToCloudinary(f))
        )
      : [];

    // Generate password for the team
    const password = generatePassword();

    // Process the players and add their data
    const playersData = players.map((player: any, index: number) => ({
      ...player,
      playerIdCard: playerIdCardUrls[index] || "", // Ensure the player has a playerIdCard URL
    }));

    const team = await TeamModel.create({
      email,
      password,
      college,
      amount,
      event,
      transactionId,
      transactionSs: transactionSsUrl,
      players: playersData,
    });

    const captain = "";
    const captainMail = "";
    const teamDetailLink = `${process.env.BASE_URL}/profile?pass=${password}`;
    const teamId = await teamIdGenerate();
    const collegeMail = process.env.EMAIL_USER;
    const htmlTemplate = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Registration Confirmation</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f1f5f8;
      color: #333;
    }
    .email-container {
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header img {
      max-width: 220px;
      margin-bottom: 20px;
    }
    .content {
      text-align: left;
      color: #555;
    }
    .content h2 {
      font-size: 28px;
      color: #2e7d32;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .content ul {
      font-size: 16px;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    .content ul li {
      margin-bottom: 10px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      font-size: 16px;
      background-color: #4caf50;
      color: #ffffff;
      border-radius: 6px;
      text-decoration: none;
      transition: background-color 0.3s ease;
      text-align: center;
    }
    .button:hover {
      background-color: #45a049;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      padding: 20px 0;
      border-top: 1px solid #e0e0e0;
      margin-top: 40px;
    }
    .footer a {
      color: #4caf50;
      text-decoration: none;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header with logo -->
    <div class="header">
      <img src="https://your-logo-url.com/logo.png" alt="Spardha Logo" />
    </div>
    <!-- Content Section -->
    <div class="content">
      <h2>Registration Successful! 🎉</h2>
      <p>Dear Team <strong>${teamId}</strong>,</p>
      <p>We are thrilled to inform you that your team has been successfully registered for the event: <strong>${event}</strong>!</p>
      <p>Below are the details of your registration:</p>
      <ul>
        <li><strong>Team Captain:</strong> ${captain}</li>
        <li><strong>Event:</strong> ${event}</li>
        <li><strong>College:</strong> ${college}</li>
        <li><strong>Transaction ID:</strong> ${transactionId}</li>
        <li><strong>Amount Paid:</strong> ₹${amount}</li>
      </ul>
      <p>We can’t wait to see your participation in the event! If you have any questions, feel free to reach out to us.</p>
      <a href="${teamDetailLink}" class="button">View Team Details</a>
    </div>
    <!-- Footer Section -->
    <div class="footer">
      <p>Best regards,<br>Spardha Team</p>
      <p>&copy; 2025 Spardha | DBIT. All Rights Reserved.</p>
      <p><a href="mailto:${collegeMail}">Contact Support</a></p>
    </div>
  </div>
</body>
</html>

  `;

    await sendMail(captainMail, "Spardha Team Registeration", htmlTemplate);
    // Generate JWT Token
    const token = jwt.sign({ email, role: "team" }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const cookieStore = await cookies();
    // Set the token in a secure HttpOnly cookie
    cookieStore.set("auth-token", token, {
      httpOnly: true, // Prevents client-side access
      maxAge: 7 * 24 * 60 * 60, // 7 day
    });
    return {
      success: true,
      message: "Team registered successfully",
      team,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
};
