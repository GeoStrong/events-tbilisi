import React from "react";
import UsersHeader from "./usersHeader";
import { getUserById } from "@/lib/auth/auth";
import UsersBody from "./usersBody";

interface UsersLayoutProps {
  userId: string;
}

const UsersLayout: React.FC<UsersLayoutProps> = async ({ userId }) => {
  const userProfile = await getUserById(userId);

  return (
    <>
      <UsersHeader user={userProfile} />
      <UsersBody user={userProfile} />
    </>
  );
};
export default UsersLayout;
