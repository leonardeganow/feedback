// pages/api/users/index.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import EmployeeModel from "@/app/models/employees";

export async function GET() {
  try {
    await connectToDatabase();
    const employees = await EmployeeModel.find({});
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
