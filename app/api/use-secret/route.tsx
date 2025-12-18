import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/auth";
import { env } from "@/lib/utils/env";

async function handleGetSecret() {
  // process.env.GOOGLE_MAPS_API_KEY
  const key = env.googleMapsApiKey || "";

  return NextResponse.json({
    key,
  });
}

export const GET = withAuth(handleGetSecret);
