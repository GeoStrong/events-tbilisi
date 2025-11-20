import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.API_KEY || "";

  return NextResponse.json(key);
}
