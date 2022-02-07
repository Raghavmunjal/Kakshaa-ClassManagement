/** @format */

import mongoose from "mongoose";
const InstituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Institute = mongoose.model("Institute", InstituteSchema);
export default Institute;
