/** @format */

import express from "express";
import formidable from "express-formidable";
import { isInstructor, protect } from "../middleware/authMiddleware";
import {
  currentInstructor,
  courseCreate,
  courseGetAll,
  addLesson,
  uploadVideo,
  courseGetDetails,
  uploadAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
  deleteLesson,
  courseDelete,
} from "../controllers/InstructorController";
const router = express.Router();

router.route("/isvalid").post(protect, isInstructor, currentInstructor);
router.route("/course/create").post(protect, isInstructor, courseCreate);

router.route("/course/delete").delete(protect, isInstructor, courseDelete);
router
  .route("/course/upload-video")
  .post(
    formidable({ maxFileSize: 700 * 1024 * 1024 }),
    protect,
    isInstructor,
    uploadVideo,
  );
router
  .route("/course/upload-announcement")
  .post(protect, isInstructor, uploadAnnouncement);
router.route("/course/add-lesson").post(protect, isInstructor, addLesson);
router
  .route("/course/delete-lesson")
  .delete(protect, isInstructor, deleteLesson);
router
  .route("/course/add-announcement")
  .post(protect, isInstructor, addAnnouncement);
router
  .route("/course/delete-announcement")
  .delete(protect, isInstructor, deleteAnnouncement);
router.route("/course/get").post(protect, isInstructor, courseGetDetails);
router.route("/course/get/all").post(protect, isInstructor, courseGetAll);

export default router;
