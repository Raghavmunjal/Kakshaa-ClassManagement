/** @format */

import userSchema from "../models/UserModel";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { mailTemplate } from "../utils/awsServices";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

//@desc   Login User
//@routes POST /api/user/login
//@access PUBLIC
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).send("User Not Found!");
    }

    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = generateToken(user._id);

    // send token in cookie
    // when user successfully logs in server send the cookie response so this token will be accessible for the browser so browser whenever making request to backend this token is automatically included.
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true // only work on https in production with ssl certificates
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      image: user.image,
      phone: user.phone,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Login Failed");
  }
};

//@desc   Verify Email For Resetting Password
//@routes POST /api/user/verify-email
//@access PUBLIC
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("User Not Found!");
    }
    const otp = crypto.randomInt(1000, 9999);
    const hashedOtp = await hashPassword(otp.toString());
    const updateUser = await userSchema.findOneAndUpdate(
      { email },
      { hashedOtp: hashedOtp }
    );
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
            <h1>Reset Your Password</h1>
            <p>Use this code</p>
            <h2 style="color:red;">${otp}</h2>
            <i>https://kakshaa.herokuapp.com/</i>
            </html>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Otp for Reset Password",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(hashedOtp);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again");
  }
};

//@desc   Forgot Password
//@routes POST /api/user/forgot-password
//@access PUBLIC
export const forgotPassword = async (req, res) => {
  try {
    const { email, password, otp, hashCode } = req.body;
    const user = await userSchema.findOne({ email });

    if (!otp || user.hashedOtp === "") {
      return res.status(400).send("Otp is required");
    }

    const isOtpMatched = await comparePassword(otp, user.hashedOtp);
    if (!isOtpMatched) {
      return res.status(400).send("Invalid Otp");
    }

    if (!password || password.length < 8)
      return res
        .status(400)
        .send("Password is required and should be min 8 characters long");

    if (!user) {
      return res.status(400).send("Email Not Found");
    }

    const hashedPassword = await hashPassword(password);

    const updateUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword, hashedOtp: "" }
    );

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
                <h1>Password Reset Successfully</h1>
                <i>https://kakshaa.herokuapp.com/</i>
                </html>
                `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Password Reset",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json({ success: true });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again");
  }
};

//@desc   Logout User
//@routes POST /api/user/logout
//@access PRIVATE/USER
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Successfully logout" });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error try again!");
  }
};

//@desc   Current User
//@routes POST /api/user/isvalid
//@access PUBLIC
export const currentUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userSchema.findById(id).exec();
    if (!user) {
      return res.status(401).send("UnAuthorized");
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   User Details
//@routes POST /api/user/:id
//@access PRIVATE
export const userDetails = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findById(id).select("-password").exec();
  if (!user) {
    return res.status(401).send("User Not Found");
  }
  res.json(user);
};

//@desc   User Update
//@routes POST /api/user/:id
//@access PRIVATE
export const userUpdate = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const { id } = req.user;
    const user = await userSchema
      .findByIdAndUpdate(id, { name, phone }, { new: true })
      .select("-password")
      .exec();
    if (!user) {
      return res.status(401).send("User Not Found");
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Upload Image
//@routes POST /api/user/upload-image
//@access PRIVATE
export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).send("No Image");
    }

    //prepare the image

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    //image params prepare the image just keep the binary data remove the data type store images using base64 format.
    const params = {
      Bucket: "class-room",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Error,Please Try Again");
      }
      res.json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Delete User
//@routes DELETE /api/user/:id
//@access PRIVATE
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findByIdAndDelete(id).exec();
  if (!user) {
    return res.status(401).send("User Not Found");
  }
  res.json(user);
};
