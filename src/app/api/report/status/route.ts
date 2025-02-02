import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";
import sendMail from "@/utils/sendMail.util";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await dbConnect()
    try {
        const {_id,status,reason} =await  req.json();
        const team = await TeamModel.findById(_id);
        if(!team){
            return NextResponse.json({
                success:false,
                message:"team is not found"
            },{status:400})
        }
        if(team.status==status){
            return NextResponse.json({
                message:`Status is alreasy ${status}`,
                success:true
            },{status:400});
        }
        team.status=status;
        if(reason){
            team.reason=reason;
        }

        let captainEmail;

        for(let i=0;i<team.players.length;i++){
            if(team.players[i].isCaptain){
                captainEmail=team.players[i].email;
            }
        }
        const collegeEmail=process.env.EMAIL_USER!;
        const teamDetailLink = `${process.env.BASE_URL}/profile?pass=${team.password}`;
        await team.save({validateBeforeSave:false});
        const htmlTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background: #0073e6;
            color: #ffffff;
            padding: 15px;
            font-size: 20px;
            font-weight: bold;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
        .status {
            padding: 15px;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
        }
        .approved {
            background: #d4edda;
            color: #155724;
        }
        .rejected {
            background: #f8d7da;
            color: #721c24;
        }
        .pending {
            background: #fff3cd;
            color: #856404;
        }
        .reason {
            background: #fbe8a6;
            padding: 10px;
            border-radius: 5px;
            color: #d39e00;
            font-size: 14px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .cta-button {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 15px;
            font-size: 16px;
            color: #ffffff;
            background: #0073e6;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .cta-button:hover {
            background: #005bb5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Team Status Update</div>
        <div class="content">
            <p>Hello <strong>${team.teamID}</strong>,</p>
            <p>Your team's status has been updated to:</p>
            <div class="status ${status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending'}">
                ${status}
            </div>
            ${status === 'approved' ? '<p>>🎉 Congratulations! Your team has been approved.</p>' : ''}
            ${status === 'rejected' ? '<p>️⚠️ Unfortunately, your request was not approved.</p>' : ''}
            ${reason ? `<div class="reason"><strong>Reason:</strong> ${reason}</div>` : ""}
             <p>You can check your team details by clicking the button below:</p>
            <a href="${teamDetailLink}" class="cta-button">View Team Details</a>

            <p>If you have any questions, please contact the Spardha Team.</p>
            <a href="mailto:${collegeEmail}" class="cta-button">Contact Admin</a>
        </div>
        <div class="footer">
            Best regards,<br>
            <strong>Spardha Team</strong>
        </div>
    </div>
</body>
</html>
`
        await sendMail(captainEmail!,`Status Update for Team ${team.teamID}`,htmlTemplate)
        return NextResponse.json({
            message:"Status successfuly Updated ",
            success:true
        },{status:200});
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message || "internal error"
        },{status:500})
    }
}