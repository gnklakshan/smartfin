import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = resend.emails.send({
      from: "SmartFin Team <onboarding@resend.dev>",
      to: to,
      subject: subject,
      react: react,
    });

    return {
      status: true,
      message: "Email sent successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      status: false,
      error: error.message || "Unknown error",
    };
  }
}
