import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import AnswerModel from "@/app/models/answer";

export async function POST(request) {
  try {
    const { userId, employeeId, question1, question2, question3 } =
      await request.json();

    await connectToDatabase();

    const newAnswer = new AnswerModel({
      userId,
      employeeId,
      question1,
      question2,
      question3,
    });

    await newAnswer.save();

    return NextResponse.json(
      {
        message: "feedback submitted successfuly",
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(error.message, { status: 500 });
  }
}
