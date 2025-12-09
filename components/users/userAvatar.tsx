"use client";

import React from "react";
import defaultUserImg from "@/public/images/default-user.png";
import useOptimizedImage from "@/lib/hooks/useOptimizedImage";
import OptimizedImage from "@/components/ui/optimizedImage";

interface UserAvatarProps {
  avatarPath?: string | null;
  size?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  avatarPath,
  size = 50,
  className = "",
  containerClassName = "",
  priority = false,
}) => {
  const { imageUrl } = useOptimizedImage(avatarPath || "", {
    width: size,
    height: size,
    quality: 50,
    fallback: defaultUserImg.src,
  });

  const src = imageUrl || defaultUserImg.src;

  return (
    <OptimizedImage
      src={src}
      width={size}
      height={size}
      alt="profile"
      priority={priority}
      objectFit="cover"
      quality={50}
      objectPosition="center"
      containerClassName={`h-16 w-16 rounded-full md:h-44 md:w-44 ${containerClassName}`}
      className={className}
    />
  );
};

export default UserAvatar;
