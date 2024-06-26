// models/User.js
import mongoose from "mongoose";

// const EmployeeStatusSchema = new mongoose.Schema({
//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Employee',
//     required: true
//   },
//   status: {
//     type: String,
//     default: 'incomplete',
//   }
// }, { _id: false });

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // employeeStatuses: [EmployeeStatusSchema],
  },
  { collection: "users" }
);

const UsersModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UsersModel;
