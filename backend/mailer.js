import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, message) => {
  const emailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: message,
  };
  await transporter.sendMail(emailOptions);
};
