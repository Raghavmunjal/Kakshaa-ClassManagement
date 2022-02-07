/** @format */

import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);
const S3 = new AWS.S3(awsConfig);

export const mailTemplate = (params) => {
  return SES.sendEmail(params).promise();
};


export const deleteTemplate = (params) => {
  S3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Error,Please Try Again");
    }
    return true;
  });
};
