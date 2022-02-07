/** @format */

import express from "express";
import {
  loginUser,
  forgotPassword,
  verifyEmail,
  logoutUser,
  currentUser,
  userDetails,
  userUpdate,
  deleteUser,
  uploadImage,
} from "../controllers/UserController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.route("/upload-image").post(protect, uploadImage);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-email").post(verifyEmail);
router.route("/isvalid").post(protect, currentUser);
router.route("/logout").post(logoutUser);
router.route("/update-profile").put(protect, userUpdate);
router.route("/:id").post(protect, userDetails).delete(protect, deleteUser);

export default router;
