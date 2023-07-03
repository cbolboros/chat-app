import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "Registration error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
