import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const record = body.record;

  try {
    await transporter.sendMail({
      from: `"DineSotto" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      subject: `New rating submitted`,
      html: `
        <p><strong>Restaurant ID:</strong> ${record.restaurant_id}</p>
        <p><strong>Time slot:</strong> ${record.time_slot}</p>
        <p><strong>Day:</strong> ${record.day_of_week}</p>
        <p><strong>Music:</strong> ${record.music_score}</p>
        <p><strong>Crowd:</strong> ${record.crowd_score}</p>
        <p><strong>Spacing:</strong> ${record.spacing_score}</p>
        <p><strong>Review:</strong> ${record.review_text ?? "none"}</p>
        <p><strong>IP:</strong> ${record.ip_address ?? "unknown"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}