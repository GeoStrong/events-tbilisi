import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2/r2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePath, expiresIn = 60 * 60 } = body;

    if (!filePath) {
      return NextResponse.json({ error: "Missing filePath" }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET || "activities-tbilisi",
      Key: filePath,
    });

    const signedUrl = await getSignedUrl(r2, command, {
      expiresIn,
    });

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed GET URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 },
    );
  }
}
