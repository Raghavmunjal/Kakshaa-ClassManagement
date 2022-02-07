/** @format */

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Student",
      enum: ["Student", "Instructor", "Admin"],
    },
    image: {},
    hashedOtp: {
      type: String,
      default: "",
    },
    courseId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
