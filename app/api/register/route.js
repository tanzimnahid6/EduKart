import { dbConnect } from "@/service/mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/model/user-model";
export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };
  console.log(newUser);

  try {
    await User.create(newUser);
    return new NextResponse(
      { message: "user has been created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("-------------------------------------", error);

    return new NextResponse(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
};
