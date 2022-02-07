/** @format */

import express from "express";
import { isStudent, protect } from "../middleware/authMiddleware";
import {
  currentStudent,
  courseGetAll,
  courseGetDetails,
} from "../controllers/StudentController";
const router = express.Router();

router.route("/isvalid").post(protect, isStudent, currentStudent);
router.route("/course/get").post(protect, isStudent, courseGetDetails);
router.route("/course/get/all").post(protect, isStudent, courseGetAll);

export default router;
