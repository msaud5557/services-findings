import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/UserModel";
import Joi from "joi";
import { generateToken } from "@/app/utils/Helper";

// JOI Validation Schema
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const { error } = schema.validate(body);
    if (error) {
      return NextResponse.json({success: false, message: error.details[0].message }, { status: 400 });
    }

    const { email, password } = body;

    // Find user by email
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({success: false, message: "Invalid email or password" }, { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 400 });
    }

    const token = generateToken({ id: user._id });
    // Prepare response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({ success: true, message: "Sign in successful", data: { user: userResponse, token} });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
