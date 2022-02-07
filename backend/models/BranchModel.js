/** @format */

import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: "Institute is required",
    },
  },
  { timestamps: true },
);

const Branch = mongoose.model("Branch", BranchSchema);
export default Branch;
