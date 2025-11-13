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

const HeaderProfile: React.FC<{ userName: string | undefined }> = ({
  userName,
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ProfileAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
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
