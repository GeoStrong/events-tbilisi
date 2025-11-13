"use client";

import { Calendar, Camera } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserProfile } from "@/lib/types";
import defaultUserImg from "@/public/images/default-user.png";
import { Badge } from "../ui/badge";

interface ProfileHeaderProps {
  user: UserProfile | null;
  edit: boolean;
  onEditHandle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  edit,
  onEditHandle,
}) => {
  const handleSave = () => {
    onEditHandle(false);
  };

  const handleCancel = () => {
    onEditHandle(false);
  };

  return (
    <>
      <Card className="dark:bg-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={user?.avatar_path || defaultUserImg.src}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-10 w-10 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {!user && <Badge variant="outline">Guest Profile</Badge>}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2>{user?.name}</h2>
                {user && <p className="text-muted-foreground">{user.email}</p>}
              </div>

              {!edit && user?.additionalInfo && (
                <p className="text-muted-foreground">{user?.additionalInfo}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined Nov 2025</span>
                </div>
              </div>

              <div className="flex gap-2">
                {edit ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => onEditHandle(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ProfileHeader;
