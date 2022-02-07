/** @format */

import courseSchema from "../models/CourseModel";
import userSchema from "../models/UserModel";

//@desc   Current Student
//@routes POST /api/student/isvalid
//@access PUBLIC
export const currentStudent = async (req, res) => {
  res.json({ success: true });
};

//@desc   Get All Course
//@routes POST /api/student/course/get/all
//@access PRIVATE
export const courseGetAll = async (req, res) => {
  try {
    const id = req.user.id;
    const students = await userSchema.findById({ _id: id }).select("-password");
    let courses = [];
    let cou = [];
    let { page } = req.body;
    if (!page) page = 1;
    const pageSize = 4;

    for (let i = 0; i < students.courseId.length; i++) {
      const course = await courseSchema
        .findById(students.courseId[i])
        .populate("instructor")
        .exec();
      //.sort([[sort, order]])
      cou.push(course);
    }
    cou.reverse();
    courses = cou.slice(
      pageSize * (page - 1),
      pageSize * (page - 1) + pageSize
    );
    res.json({ courses, page, pages: Math.ceil(cou.length / pageSize) });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Get Course
//@routes POST /api/student/course/get
//@access PRIVATE
export const courseGetDetails = async (req, res) => {
  try {
    const { slug } = req.body;
    const course = await courseSchema
      .findOne({ slug })
      .populate("instructor")
      .populate("batch");
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};
