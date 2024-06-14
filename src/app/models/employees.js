// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    applicationStatus: {
      type: String,
    },
  },
  { collection: "employees" }
);

const EmployeeModel =
  mongoose.models.Employee || mongoose.model("Employee", UserSchema);

export default EmployeeModel;
