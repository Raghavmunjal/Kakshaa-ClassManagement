/** @format */

import branchSchema from "../models/BranchModel";
import batchSchema from "../models/BatchModel";
import courseSchema from "../models/CourseModel";
import userSchema from "../models/UserModel";
import slugify from "slugify";

//@desc   Create Branch
//@routes POST /api/admin/branch
//@access PRIVATE/ADMIN
export const createBranch = async (req, res) => {
  try {
    const { name, institute } = req.body;
    const slug = slugify(name);

    if (!institute) {
      return res.status(400).send("Select Institute");
    }

    const branch = await new branchSchema({ name, slug, institute }).save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};

//@desc   Get All Branches
//@routes POST /api/admin/branch/all
//@access PRIVATE/ADMIN
export const getAllBranch = async (req, res) => {
  try {
    const branches = await branchSchema.find({}).populate("institute").exec();
    res.json(branches);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Getting Branches");
  }
};

//@desc   Delete Branch
//@routes POST /api/admin/branch/:slug
//@access PRIVATE/ADMIN
export const deleteBranch = async (req, res) => {
  try {
    const { slug } = req.params;
    const branch = await branchSchema.findOneAndDelete({ slug }).exec();

    const id = branch._id;
    const batches = await batchSchema.find({ branch: id }).exec();

    for (let i = 0; i < batches.length; i++) {
      const batch = await batchSchema
        .findOneAndDelete({ _id: batches[i]._id })
        .exec();
    }

    let students = [];
    let courses = [];
    let instructors = [];

    for (let i = 0; i < batches.length; i++) {
      const student = await userSchema.find({ batch: batches[i]._id }).exec();
      const course = await courseSchema.find({ batch: batches[i]._id }).exec();
      if (student) {
        for (let j = 0; j < student.length; j++) {
          students.push(student[j]._id);
        }
      }

      if (course) {
        for (let j = 0; j < course.length; j++) {
          courses.push(course[j]._id);
          instructors.push(course[j].instructor);
        }
      }
    }

    for (let i = 0; i < instructors.length; i++) {
      const instructor = await userSchema.findByIdAndUpdate(
        { _id: instructors[i] },
        { $pull: { courseId: courses[i] } },
        { new: true },
      );
    }

    for (let i = 0; i < students.length; i++) {
      const student = await userSchema
        .findByIdAndDelete({ _id: students[i] })
        .exec();
    }

    for (let i = 0; i < courses.length; i++) {
      const course = await courseSchema
        .findByIdAndDelete({ _id: courses[i] })
        .exec();
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Deleting Branch");
  }
};

//@desc  Update Branch
//@routes PUT /api/admin/branch
//@access PRIVATE/ADMIN
export const updateBranch = async (req, res) => {
  try {
    const { name, institute, id } = req.body;
    console.log("branch ", name, institute, id);
    const slug = slugify(name);

    if (!institute) {
      return res.status(400).send("Select Institute");
    }

    const branch = await branchSchema
      .findOneAndUpdate({ _id: id }, { slug, institute, name }, { new: true })
      .exec();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};
