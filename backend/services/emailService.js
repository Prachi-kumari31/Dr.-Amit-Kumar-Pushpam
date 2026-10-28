import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP configuration when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP configuration error:", error.message);
  } else {
    console.log("Email service is ready.");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error(
        "SMTP_USER or SMTP_PASS is missing in the .env file"
      );
    }

    const info = await transporter.sendMail({
      from: `"Dr. Amit Kumar Pushpam" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully to:", to);
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email sending error:", error.message);
    throw error;
  }
};