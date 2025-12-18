import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/auth";
import { env } from "@/lib/utils/env";

async function handleGetSecret(request: NextRequest) {
  const key = env.googleMapsApiKey || "";
  const maskedKey = key
    ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}`
    : "";

  return NextResponse.json({
    key: process.env.NODE_ENV === "development" ? key : maskedKey,
    warning: "This endpoint exposes sensitive data. Remove in production.",
  });
}
