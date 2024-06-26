// pages/api/users/index.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import EmployeeModel from "@/app/models/employees";
import { getServerSession } from "next-auth";
import AnswerModel from "@/app/models/answer";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await connectToDatabase();
    const session = await getServerSession();

    // Fetch feedbacks given by the user
    const feedbacks = await AnswerModel.find({
      userId: session.user.email,
    }).populate("employeeId");

    if (!feedbacks) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
