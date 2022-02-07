/** @format */

import mongoose from "mongoose";
const BatchSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
    },
    year :{
        type: String,
        required: true,
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: "Institute is required",
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: "Branch is required",
    },
  },
  { timestamps: true },
);

const Batch = mongoose.model("Batch", BatchSchema);
export default Batch;
