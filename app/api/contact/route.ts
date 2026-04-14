import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  formatErrorMessage,
  optionalText,
  requireEmail,
  requireInquiryType,
  requireText,
} from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 202 });
    }

    const name = requireText(body.name, "Name", { max: 80 });
    const company = optionalText(body.company, 120);
    const email = requireEmail(body.email);
    const inquiryType = requireInquiryType(body.inquiryType);
    const message = requireText(body.message, "Message", {
      min: 20,
      max: 3000,
    });

    await prisma.contactInquiry.create({
      data: {
        name,
        company,
        email,
        inquiryType,
        message,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact Inquiry Error:", error);

    return NextResponse.json(
      { error: formatErrorMessage(error, "Unable to submit your inquiry.") },
      { status: 400 },
    );
  }
}
