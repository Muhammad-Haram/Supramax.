import express from "express";
import { sendEmail } from "../mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, businessName, email, phone } = req.body;

  const message = `
  <div style="
    font-family: Arial, sans-serif; 
    color: #333; 
    padding: 20px; 
    border: 1px solid #ddd; 
    border-radius: 8px; 
    max-width: 600px;
    margin: auto;
  ">
    <div style="text-align: center;">
      <img src="https://firebasestorage.googleapis.com/v0/b/supramax-48729.appspot.com/o/logo.png?alt=media&token=2c99e0c2-e9f1-4edf-9050-b9755ba87b14" alt="Company Logo" style="width: 150px; margin-bottom: 20px;" />
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      You have a new contact request from:
    </p>
    <table style="width: 100%; font-size: 16px; line-height: 1.6;">
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">Name:</td>
        <td>${firstName} ${lastName}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">Business:</td>
        <td>${businessName}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">Email:</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
        <td>${phone}</td>
      </tr>
    </table>
    <div style="margin-top: 20px; text-align: center;">
      <a href="mailto:${email}" style="
        background-color: #0066cc; 
        color: #fff; 
        padding: 10px 20px; 
        border-radius: 5px; 
        text-decoration: none; 
        font-size: 16px;
      ">Reply to Contact</a>
    </div>
  </div>
`;

  try {
    await sendEmail("haramh643@gmail.com", "New Contact Request", message); // Yahan recipient ka email daalein
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});

export default router;
