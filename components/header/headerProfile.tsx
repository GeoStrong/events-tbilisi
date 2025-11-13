import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth";
import ProfileAvatar from "../general/profileAvatar";
import Link from "next/link";
import { UserProfile } from "@/lib/types";

const HeaderProfile: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ProfileAvatar image={user?.avatar_path} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="dark:bg-gray-900">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              window.location.reload();
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default HeaderProfile;
