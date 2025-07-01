
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      { success: true, message: "Welcome to my server" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
