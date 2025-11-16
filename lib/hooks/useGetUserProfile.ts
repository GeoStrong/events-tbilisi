import { useEffect, useState } from "react";
import { fetchUserProfile } from "../auth/auth";
import { UserProfile } from "../types";

const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile[] | null>(null);
  const user = userProfile && userProfile[0];
  useEffect(() => {
    (async () => {
      const user = await fetchUserProfile();
      setUserProfile(user.flat());
    })();
  }, []);

  return { userProfile, user };
};

export default useGetUserProfile;
