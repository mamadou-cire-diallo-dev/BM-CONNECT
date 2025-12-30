import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: Number(env.SMTP_PORT) === 465, // 587 => false
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
});

export async function sendOtpEmail({ to, code }) {
  const subject = `${env.APP_NAME} - Code de vérification`;
  const html = `
    <div style="font-family: Arial, sans-serif">
      <h2>${env.APP_NAME}</h2>
      <p>Voici ton code de vérification email :</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 3px;">${code}</p>
      <p>Ce code expire dans 10 minutes.</p>
    </div>
  `;

  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    html,
  });
}
