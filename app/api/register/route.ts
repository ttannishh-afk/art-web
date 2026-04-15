import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  formatErrorMessage,
  optionalText,
  requireEmail,
  requirePassword,
} from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const { email, password, phone, name } = await req.json();
    const normalizedEmail = requireEmail(email);
    const validatedPassword = requirePassword(password);
    const validatedPhone = optionalText(phone, 30);
    const validatedName = optionalText(name, 80);

    const exists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validatedPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        phone: validatedPhone,
        name: validatedName,
        cart: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);

    return NextResponse.json(
      { error: formatErrorMessage(error, "Unable to create your account.") },
      { status: 400 },
    );
  }
}
