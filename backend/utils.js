import bcrypt from "bcryptjs";
import s3 from "@aws-sdk/client-s3";
import User from "./data/users.js";

//redirect with error - not sure if needed
export function handleRedirectWithError(res, error, message) {
  const url = new URL(req.headers.referer);
  url.searchParams.set("error", message);
  res.redirect(decodeURI(url.toString()));
}

//hash password
export async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new Error("Internal Server Error.");
  }
}

//check unique username and email
export async function isEmailUnique(email) {
  const emailCheck = await User.findOne({ email });
  return !emailCheck;
}

export async function isUsernameUnique(username) {
  const usernameCheck = await User.findOne({ username });
  return !usernameCheck;
}

//S3 upload
const client = new s3.S3Client({
  endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

export async function uploadToS3(filename, contents) {
  const command = new s3.PutObjectCommand({
    Bucket: "csad-storage",
    Key: filename,
    Body: contents,
  });

  try {
    const response = await client.send(command);
    console.log(response);
    return { err: false };
  } catch (err) {
    console.error(err);
    return { err };
  }
}
