import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import EmployeeModel from "@/app/models/employees";
import connectToDatabase from "@/app/lib/mongodb";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.image || !data.fullName) {
      throw new Error("Image data is missing");
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(data.image, {
      folder: "feedback-user-photos", // Optional: specify a folder
    });

    // The URL of the uploaded image
    const imageUrl = uploadResponse.secure_url;

    await connectToDatabase();

    const newEmployee = new EmployeeModel({
      fullname: data.fullName,
      imageUrl: imageUrl,
      applicationStatus: "incomplete",
    });

    await newEmployee.save();

    return NextResponse.json(
      {
        message: "employee added successfuly",
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(error.message, { status: 500 });
  }
}
