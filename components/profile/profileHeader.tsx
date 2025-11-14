"use client";

import { Calendar, Camera } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserProfile } from "@/lib/types";
import defaultUserImg from "@/public/images/default-user.png";
import { handleUploadUserAvatar } from "@/lib/profile/profile";

interface ProfileHeaderProps {
  user: UserProfile | null;
  edit: boolean;
  onEditHandle: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveHandle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  edit,
  onEditHandle,
  onSaveHandle,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar_path || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      setUploading(true);

      if (!user) throw new Error("Not signed in");

      const uploadedUrl = await handleUploadUserAvatar(user, file);

      setAvatarUrl(uploadedUrl);
      setPreviewUrl(null);
      onEditHandle(false);
    } catch (err) {
      console.error("Error uploading avatar:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    onEditHandle(false);
  };

  useEffect(() => {
    setAvatarUrl(user?.avatar_path || "");
  }, [user]);

  return (
    <>
      <Card className="dark:bg-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Avatar className="h-32 w-32 border dark:border-gray-600">
                  <AvatarImage
                    src={previewUrl || avatarUrl || defaultUserImg.src}
                    alt={user?.name}
                    className="object-cover"
                  />
                </Avatar>
                {edit && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full"
                    disabled={uploading}
                    onClick={handleAvatarClick}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
                    <Button onClick={onSaveHandle}>Save Changes</Button>
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
