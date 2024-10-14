import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create the transporter with the SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD, //9862042102
  },
});


export const sendMail = async ({ receiver, subject, text, html }) => {
  try {
    const mailOptions = {
      from: {
        address: process.env.SMTP_MAIL,
        name: "Company Name",
      },
      to: receiver,
      subject: subject,
      text: text,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error in sendMail function:", error);
    throw error;
  }
};