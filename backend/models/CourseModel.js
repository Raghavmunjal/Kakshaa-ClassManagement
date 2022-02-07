/** @format */

import mongoose from "mongoose";

const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now(),
    },
    video: {},
  },
  {
    timestamps: true,
  },
);

const AnnouncementSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now(),
    },
    file: {},
  },
  { timestamps: true },
);

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      minLength: 20,
      maxLength: 250,
      required: true,
    },
    image: {},
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    lessons: [lessonSchema],
    announcements: [AnnouncementSchema],
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
