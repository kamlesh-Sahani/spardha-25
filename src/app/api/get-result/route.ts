import SportsPoints from "@/models/result.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const results = await SportsPoints.find({});

    const collegePoints: Record<
      string,
      { college: string; points: number; event: string }[]
    > = {};

    results.forEach(({ event, winner, runnerUp }) => {
      if (winner?.college) {
        if (!collegePoints[event]) collegePoints[event] = [];
        collegePoints[event].push({
          college: winner.college,
          points: winner.points,
          event,
        });
      }
      if (runnerUp?.college) {
        if (!collegePoints[event]) collegePoints[event] = [];
        collegePoints[event].push({
          college: runnerUp.college,
          points: runnerUp.points,
          event,
        });
      }
    });

    // Flatten the object into an array and sort by points
    const sortedResults = Object.values(collegePoints)
      .flat()
      .sort((a, b) => b.points - a.points);

    return NextResponse.json(sortedResults);
  } catch (error) {
    console.error("Error fetching sports points:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
