import React from "react";
import useOptimizedImage from "@/lib/hooks/useOptimizedImage";
import defaultUserImg from "@/public/images/default-user.png";
import OptimizedImage from "../ui/optimizedImage";

const ParticipantAvatars: React.FC<{
  userImagePath: string;
  size?: number;
}> = ({ userImagePath, size = 8 }) => {
  const { imageUrl: avatarUrl } = useOptimizedImage(userImagePath || "", {
    quality: 50,
    width: 18,
    height: 18,
    fallback: defaultUserImg.src,
  });

  return (
    <OptimizedImage
      src={avatarUrl}
      width={20}
      height={20}
      containerClassName={`h-${size} w-${size} rounded-full`}
      alt="profile"
      priority={false}
    />
  );
};
export default ParticipantAvatars;
