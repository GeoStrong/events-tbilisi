import React, { useEffect, useState } from "react";
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
import { getImageUrl } from "@/lib/functions/supabaseFunctions";
import useScreenSize from "@/lib/hooks/useScreenSize";

const HeaderProfile: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const [image, setImage] = useState("");
  const { isMobile } = useScreenSize();

  useEffect(() => {
    (async () => {
      const img = await getImageUrl(user?.avatar_path || "");
      setImage(img || "");
    })();
  }, [user?.avatar_path]);

  return (
    <>
      {isMobile ? (
        <Link href="/profile">
          <ProfileAvatar image={image || ""} />
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfileAvatar image={image || ""} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="dark:bg-gray-900">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile" className="cursor-pointer">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
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
      )}
    </>
  );
};
export default HeaderProfile;
