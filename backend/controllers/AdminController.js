/** @format */
import { mailTemplate } from "../utils/awsServices";
import userSchema from "../models/UserModel";
import batchSchema from "../models/BatchModel";
import courseSchema from "../models/CourseModel";
const generator = require("generate-password");
import { hashPassword } from "../utils/bcrypt";

//@desc   Current Admin
//@routes POST /api/admin/isvalid
//@access PUBLIC
export const currentAdmin = async (req, res) => {
  res.json({ success: true });
};

//@desc   Register Instructor
//@routes POST /api/admin/instructor/register
//@access PRIVATE
export const registerInstructor = async (req, res) => {
  try {
    const { name, email, phone, image } = req.body;
    const password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: false,
    });
    const hashedPassword = await hashPassword(password);
    const user = await new userSchema({
      name,
      email,
      phone,
      role: "Instructor",
      image,
      password: hashedPassword,
    }).save();

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
              <h2>Hey ${name}</h2> 
              <p>Hope this email finds you well. You are successfully registered as an instructor.</p>
              <p>Your credentials are : </p>
              <p>Email - <span style="color:red;">${email} </span></p> 
              <p>Password - <span style="color:red;">${password} </span></p> 
              <i>https://kakshaa.herokuapp.com/</i>
              </html>
              `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Registered Successfully",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again,Please check all fields");
  }
};

//@desc   Register Student
//@routes POST /api/admin/student/register
//@access PRIVATE
export const registerStudent = async (req, res) => {
  try {
    const { name, email, phone, image, institute, section, year, branch } =
      req.body;

    const batch = await batchSchema
      .findOne({
        institute: institute,
        section: section,
        year: year,
        branch: branch,
      })
      .exec();

    const courses = await courseSchema.find({ batch: batch._id }).exec();

    let courseId = [];
    for (let i = 0; i < courses.length; i++) {
      courseId.push(courses[i]._id);
    }

    const password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: false,
    });
    const hashedPassword = await hashPassword(password);
    const user = await new userSchema({
      name,
      email,
      phone,
      role: "Student",
      image,
      batch: batch._id,
      password: hashedPassword,
      courseId,
    }).save();

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
                <html>
                <h2>Hey ${name}</h2>
                <p>Hope this email finds you well. You are successfully registered as a student.</p>
                <p>Your credentials are : </p>
                <p>Email - <span style="color:red;">${email} </span></p>
                <p>Password - <span style="color:red;">${password} </span></p>
                <i>https://kakshaa.herokuapp.com/</i>
                </html>
                `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Registered Successfully",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again,Please check all fields");
  }
};

//@desc   Display Student
//@routes POST /api/admin/student/display
//@access PRIVATE
export const displayStudent = async (req, res) => {
  try {
    const students = await userSchema
      .find({ role: "Student" })
      .populate("batch")
      .exec();
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Display Instructor
//@routes POST /api/admin/instructor/display
//@access PRIVATE
export const displayInstructor = async (req, res) => {
  const instructors = await userSchema.find({ role: "Instructor" }).exec();
  res.json(instructors);
};
