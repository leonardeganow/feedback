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

    const employees = await EmployeeModel.find({});

    // Fetch feedbacks given by the user
    const feedbacks = await AnswerModel.find({
      userId: session.user.email,
    }).populate("employeeId");
    // Create a map of employee IDs who have received feedback
    const feedbackEmployeeIds = feedbacks.map((feedback) =>
      feedback.employeeId._id.toString()
    );

    // Add status to each employee
    const employeesWithStatus = employees.map((employee) => ({
      ...employee.toObject(),
      status: feedbackEmployeeIds.includes(employee._id.toString())
        ? "complete"
        : "incomplete",
    }));

    return NextResponse.json(employeesWithStatus, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
