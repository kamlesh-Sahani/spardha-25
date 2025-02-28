import SportsPoints from "@/models/result.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const result = await req.json();
    console.log("Received Data:", result);

    const { event, winner, runnerUp } = result;

    if (
      !event ||
      !winner ||
      !runnerUp ||
      !winner.college ||
      !runnerUp.college
    ) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const existingEntry = await SportsPoints.findOne({ event });

    if (existingEntry) {
      existingEntry.winner.points =
        existingEntry.winner.college === winner.college
          ? existingEntry.winner.points + winner.points
          : winner.points;

      existingEntry.runnerUp.points =
        existingEntry.runnerUp.college === runnerUp.college
          ? existingEntry.runnerUp.points + runnerUp.points
          : runnerUp.points;

      await existingEntry.save();
    } else {
      await SportsPoints.create({ event, winner, runnerUp });
    }

    return NextResponse.json({
      message: "Sports points updated successfully!",
    });
  } catch (error) {
    console.error("Error in addSportsPoints:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
