import connectToDatabase from "@/app/lib/mongodb";
import QuestionsModel from "@/app/models/questions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await connectToDatabase();
    const questions = await QuestionsModel.find({});
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
