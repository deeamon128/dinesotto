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
      subject: `New restaurant suggested: ${record.name}`,
      html: `
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Area:</strong> ${record.area ?? "unknown"}</p>
        <p><strong>Address:</strong> ${record.address ?? "unknown"}</p>
        <p><strong>Cuisine:</strong> ${record.cuisine ?? "unknown"}</p>
        <p><strong>Notes:</strong> ${record.notes ?? "none"}</p>
        <p><strong>IP:</strong> ${record.ip_address ?? "unknown"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}