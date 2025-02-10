"use server";
import TeamModel from "@/models/team.model";
import { uploadImage } from "@/utils/cloudinary.util";
import generatePassword from "@/utils/generatePassword.util";
import sendMail from "@/utils/sendMail.util";
import teamIdGenerate from "@/utils/teamIdGenerate.util";
import dbConnect from "@/utils/dbConnect.util";


export const registerAction = async (teamData: any) => {
  try {
    await dbConnect();
    console.log(teamData,"in api");
  const {
    event,
    collegeName,
    players,
    transactionId,
    transactionImage,
    captain,
    amount,
    whatsapp
  } = teamData ;
    if (
      !collegeName ||
      !event ||
      !transactionId ||
      !transactionImage ||
      !captain ||
      !amount ||
      !whatsapp ||
      players.length === 0
    ) {
      return {
        success: false,
        message: "Please fill all fields and add at least one player.",
      };
    }
    let captainEmail;
    const emailsData=[] as string[];
    for(let i=0;i<players.length;i++){
      emailsData.push(players[i].email);
      if(captain===players[i].name){
        captainEmail=players[i].email;
      }
    }
    // Check if the team is already registered
   
    const isExist = await TeamModel.findOne(
    {$or:
      [
      {$and:[{event},{"players.email":captainEmail}]},
      {transactionId:transactionId}
     ]
    });
    if (isExist) {
      return {
        success: false,
        message: "Already register with this transaction id or Captain email",
      };
    }

    const teamID = await teamIdGenerate();
    if(!teamID){
      return {
        success: false,
        message: "Failed to register try Again",
      };
    }

    const transactionSsUrl = await uploadImage(transactionImage,teamID);

    // Dynamically upload each player's ID card images
    const playerIdCardUrls = await Promise.all(
          players?.map((player: any) => uploadImage(player.playerIdCard,teamID))
        )
      
    // Generate password for the team
    const password = generatePassword();

    // Process the players and add their data
    const playersData = players.map((player: any, index: number) => ({
      ...player,
      playerIdCard: playerIdCardUrls[index] || "", 
    }));
    const team = await TeamModel.create({
      teamID,
      password,
      college:collegeName,
      event,
      transactionId,
      transactionSs: transactionSsUrl,
      players: playersData,
      amount,
      whatsapp
    });
    if(!team){
      return {
        success:false,
        message:"failed to register try again"
      }
    }

    const teamDetailLink = `${process.env.BASE_URL}/profile?pass=${password}`;
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
    <!-- Content Section -->
    <div class="content">
      <h2>Registration Successful! 🎉</h2>
      <p>Dear Team <strong>${teamID}</strong>,</p>
      <p>We are thrilled to inform you that your team has been successfully registered for the event: <strong>${event}</strong>!</p>
      <p>Below are the details of your registration:</p>
      <ul>
        <li><strong>Team Captain:</strong> ${captain}</li>
        <li><strong>Event:</strong> ${event}</li>
        <li><strong>College:</strong> ${collegeName}</li>
        <li><strong>Transaction ID:</strong> ${transactionId}</li>
         <li><strong>Team Status:</strong> Under review</li>
        <li><strong>Your Password:</strong> ${password}</li>
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

    await sendMail(emailsData, "Spardha Team Registeration", htmlTemplate);
    return {
      success: true,
      message: "Team registered successfully",
      password:JSON.stringify(team.password)
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
};


export const markAttendance = async(teamID:number,password:string)=>{
  try{
    await dbConnect();
    if(!teamID || !password){
      return{
        success:false,
        message:"please fill the all fields"
      }
    }
    const team = await TeamModel.findOne({teamID});
    if(!team){
      return{
        success:false,
        message:"Team is not found"
      }
    }
    if(team.reported){
      return{
        success:false,
        message:"Team atteandance is already marked"
      }
    }

    if(team.status!=="approved"){
      return{
        success:false,
        message:"Team is not approved"
      }
    }
    if(team.password !== password){
      return{
        success:false,
        message:"Wrong teamId or password"
      }
    }


    team.reported=true;
    await team.save({validateBeforeSave:true});
    return{
      success:false,
      message:"Team attendance is marked successfuly"
    }

  }catch(error:any){
    return{
      success:false,
      message:error.message ||"internal error"
    }
  }
}

export const attendTeams = async()=>{

  try{
    await dbConnect();
    const teams = await TeamModel.find({reported:true}).select("teamID event college reported");
    return{
      message:"successfuly got",
      success:false,
      teams:JSON.stringify(teams)
    }
}catch(error:any){
  return{
    success:false,
    message:error.message ||"internal error"
  }
}
}


export const getTeam = async(_id:string)=>{

  try{
    await dbConnect();
    const team = await TeamModel.findById(_id);

    if(!team){
      return{
        success:false,
        message:"Team is not found"
      }
    }
    return{
      message:"successfuly got",
      success:false,
      team:JSON.stringify(team)
    }
}catch(error:any){
  return{
    success:false,
    message:error.message ||"internal error"
  }
}
}


