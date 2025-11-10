import { useEffect, useState } from "react";
import { fetchUserProfile } from "../auth/auth";
import { UserProfile } from "../types";

const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile[] | null>(null);
  useEffect(() => {
    (async () => {
      const user = await fetchUserProfile();
      setUserProfile(user);
    })();
  }, []);

  return { userProfile };
};

export default useGetUserProfile;
