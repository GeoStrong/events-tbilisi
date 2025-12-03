import React from "react";
import UsersHeader from "./usersHeader";
import { getUserById } from "@/lib/auth/auth";

interface UsersLayoutProps {
  userId: string;
}

const UsersLayout: React.FC<UsersLayoutProps> = async ({ userId }) => {
  const userProfile = await getUserById(userId);

  return (
    <>
      <UsersHeader user={userProfile} />
    </>
  );
};
export default UsersLayout;
