// app/api/contact-email/route.ts
"use server";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Owner Gmail
    pass: process.env.GMAIL_APP_PASSWORD, // App Password
  },
});

function createOwnerContactEmailHTML(name: string, email: string,  message: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9fafb; }
    .info { margin-bottom: 15px; }
    .label { font-weight: bold; color: #4b5563; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Message!</h1>
    </div>
    <div class="content">
      <div class="info"><span class="label">Name:</span> ${name}</div>
      <div class="info"><span class="label">Email:</span> ${email}</div>
      <div class="info"><span class="label">Message:</span></div>
      <p>${message}</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ownerMailOptions = {
      from: `Website Contact Form <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL, // Only owner gets this
      subject: `New Contact Message from ${name}`,
      html: createOwnerContactEmailHTML(name, email, message),
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(ownerMailOptions);

    return NextResponse.json({ success: true, message: "Message sent to owner" });
  } catch (error) {
    console.error("Contact email failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
