import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2/r2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePath, fileType } = body;

    if (!filePath || !fileType) {
      return NextResponse.json(
        { error: "Missing filePath or fileType" },
        { status: 400 },
      );
    }

    const uploadParams = {
      Bucket: process.env.R2_BUCKET,
      Key: filePath,
      ContentType: fileType,
    };

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand(uploadParams),
      { expiresIn: 60 * 60 * 24 * 7 },
    );

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 },
    );
  }
}
