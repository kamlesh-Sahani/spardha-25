import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await dbConnect()
    try {
        const {_id,status} =await  req.json();
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
        await team.save({validateBeforeSave:false});
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