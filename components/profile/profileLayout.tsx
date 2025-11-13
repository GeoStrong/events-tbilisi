"use client";

import React, { Suspense, useState } from "react";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import ProfileHeader from "./profileHeader";
import ProfileAboutTab from "./profileAboutTab";
import ProfileSavedTab from "./profileSavedTab";
import ProfilePreferencesTab from "./profilePreferencesTab";
import ProfileAccountTab from "./profileAccountTab";
import ProfileLayoutLoading from "./profileLayoutLoading";

const ProfileLayout: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const { userProfile } = useGetUserProfile();
  const user = userProfile && userProfile[0];

  return (
    <>
      {" "}
      <div className="min-h-screen w-full dark:bg-gray-900">
        <div className="w-full px-5 py-8">
          <Link href="/" className="mb-6 flex items-center gap-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>

          <div className="grid gap-6">
            <ProfileHeader
              user={user}
              edit={editing}
              onEditHandle={setEditing}
            />
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <ProfileAboutTab user={user} edit={editing} />

              <ProfileSavedTab />

              <ProfilePreferencesTab />

              <ProfileAccountTab user={user} />
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileLayoutWrapper: React.FC = () => {
  return (
    <Suspense fallback={<ProfileLayoutLoading />}>
      <ProfileLayout />
    </Suspense>
  );
};

export default ProfileLayoutWrapper;
