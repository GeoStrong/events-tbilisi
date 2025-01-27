import { ParticipantValues } from "@/lib/types";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (request: NextRequest) => {
  const data: ParticipantValues = await request.json();
  // const filePath = path.join(process.cwd(), "data", "users.json");
  // const fileData = fs.readFileSync(filePath);
  // const users = JSON.parse(fileData.toString());

  // if (users.find((user: ParticipantValues) => user.email === data.email)) {
  //   console.log("User already exists");
  //   return NextResponse.json(
  //     { message: "User already exists" },
  //     {
  //       status: 400,
  //       statusText: "User already exists",
  //     },
  //   );
  // } else {
  // users.push({
  //   id: crypto.randomUUID(),
  //   ...data,
  // });
  // fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return NextResponse.json(
    { message: "User created", data: data },
    { status: 200 },
  );
  // }
};
