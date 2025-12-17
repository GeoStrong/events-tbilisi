import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/auth";
import { createError } from "@/lib/utils/errorHandler";
import { env } from "@/lib/utils/env";

/**
 * SECURITY: This route should be removed or heavily restricted in production
 * It exposes sensitive API keys. Only use for development/testing purposes.
 */
async function handleGetSecret(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    throw createError.authorization(
      "This endpoint is not available in production",
    );
  }

  const key = env.googleMapsApiKey || "";
  const maskedKey = key
    ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}`
    : "";

  return NextResponse.json({
    key: process.env.NODE_ENV === "development" ? key : maskedKey,
    warning: "This endpoint exposes sensitive data. Remove in production.",
  });
}

export const GET = withAuth(handleGetSecret);
