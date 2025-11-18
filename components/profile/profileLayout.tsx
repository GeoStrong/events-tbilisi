"use client";

import React, { useEffect, useState } from "react";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import ProfileHeader from "./profileHeader";
import ProfilePreferencesTab from "./profilePreferencesTab";
import ProfileLayoutLoading from "./profileLayoutLoading";
import { redirect, useRouter } from "next/navigation";
import { handleUploadUserInformation } from "@/lib/profile/profile";
import { useLocation } from "react-use";
import { AiOutlineUser } from "react-icons/ai";
import { BsCalendar2Event } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { toast } from "sonner";
import ProfileActivitiesTab from "./profileActivitiesTab";
import ProfileAccountTab from "./profileAccountTab";

const ProfileLayout: React.FC = () => {
  const { user } = useGetUserProfile();
  const [name, setName] = useState<string>(user?.name || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [bio, setBio] = useState<string>(user?.additionalInfo || "");
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  if (user === undefined) redirect("/");

  const handleSave = async () => {
    await handleUploadUserInformation(user!, name, phone, bio);
    setEditing(false);
    toast.success("Changes have been saved");
  };

  useEffect(() => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setBio(user?.additionalInfo || "");
  }, [user]);

  const userDataValues = [name, phone, bio];
  const userDataSetFunctions = [setName, setPhone, setBio];

  const { hash } = useLocation();
  const activetab = hash?.split("#")[1];

  const goToHash = (tabName: string) => {
    router.push(`profile#${tabName}`);
  };

  return (
    <>
      {user ? (
        <div className="min-h-screen w-full dark:bg-gray-900">
          <div className="w-full px-5 py-8">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Activities
            </Link>

            <div className="grid gap-6">
              <ProfileHeader
                user={user}
                edit={editing}
                onEditHandle={setEditing}
                onSaveHandle={handleSave}
              />
              <Tabs defaultValue={activetab || "activities"} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="activities"
                    onClick={() => {
                      goToHash("");
                    }}
                  >
                    <div className="md:hidden">
                      <BsCalendar2Event />
                    </div>
                    <p className="hidden md:block">Activities</p>
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    onClick={() => {
                      goToHash("account");
                    }}
                  >
                    <div className="md:hidden">
                      <AiOutlineUser />
                    </div>
                    <p className="hidden md:block">Account</p>
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    onClick={() => {
                      goToHash("preferences");
                    }}
                  >
                    <div className="md:hidden">
                      <FiSettings />
                    </div>
                    <p className="hidden md:block">Preferences</p>
                  </TabsTrigger>
                </TabsList>

                <ProfileActivitiesTab userId={user.id} />

                <ProfileAccountTab
                  user={user}
                  edit={editing}
                  userDataValues={userDataValues}
                  onSetUserDataFunctions={userDataSetFunctions}
                />

                <ProfilePreferencesTab />
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <ProfileLayoutLoading />
      )}
    </>
  );
};

export default ProfileLayout;
