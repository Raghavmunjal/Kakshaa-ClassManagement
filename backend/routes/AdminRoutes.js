/** @format */

import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware";
import {
  currentAdmin,
  displayInstructor,
  displayStudent,
  registerInstructor,
  registerStudent,
} from "../controllers/AdminController";
import {
  createInstitute,
  getAllInstitute,
  updateInstitute,
  deleteInstitute,
} from "../controllers/InstituteController.js";
import {
  createBranch,
  getAllBranch,
  deleteBranch,
  updateBranch,
} from "../controllers/BranchController.js";
import {
  createBatch,
  getAllBatch,
  deleteBatch,
  updateBatch,
} from "../controllers/BatchController";
const router = express.Router();

router.route("/isvalid").post(protect, isAdmin, currentAdmin);

/* INSTITUTE ROUTES */
router.route("/institute/all").post(protect, getAllInstitute);
router.route("/institute/:slug").delete(protect, isAdmin, deleteInstitute);
router
  .route("/institute")
  .post(protect, isAdmin, createInstitute)
  .put(protect, isAdmin, updateInstitute);

/* BRANCH ROUTES */
router.route("/branch/all").post(protect, getAllBranch);
router.route("/branch/:slug").delete(protect, isAdmin, deleteBranch);
router
  .route("/branch")
  .post(protect, isAdmin, createBranch)
  .put(protect, isAdmin, updateBranch);

/* BATCH ROUTES */
router.route("/batch/all").post(protect, getAllBatch);
router.route("/batch/:id").delete(protect, isAdmin, deleteBatch);
router
  .route("/batch")
  .post(protect, isAdmin, createBatch)
  .put(protect, isAdmin, updateBatch);

/* INSTRUCTOR ROUTES */
router.route("/instructor/register").post(protect, isAdmin, registerInstructor);
router.route("/instructor/display").post(protect, isAdmin, displayInstructor);

/* STUDENT ROUTES */
router.route("/student/register").post(protect, isAdmin, registerStudent);
router.route("/student/display").post(protect, isAdmin, displayStudent);

export default router;
