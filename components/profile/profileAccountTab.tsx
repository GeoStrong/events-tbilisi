import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { UserProfile } from "@/lib/types";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth/auth";

interface ProfileAccountTabProps {
  user: UserProfile | null;
  edit: boolean;
  userDataValues: string[];
  onSetUserDataFunctions: React.Dispatch<React.SetStateAction<string>>[];
}

const ProfileAccountTab: React.FC<ProfileAccountTabProps> = ({
  user,
  edit,
  userDataValues,
  onSetUserDataFunctions,
}) => {
  const [nameValue, phoneValue, bioValue] = userDataValues;
  const [handleName, handlePhone, handleBio] = onSetUserDataFunctions;

  return (
    <>
      <TabsContent value="account" className="space-y-4">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and bio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                disabled={!edit}
                placeholder="Enter your name"
                className="dark:border-gray-500"
                value={nameValue}
                onChange={(event) => {
                  handleName(event.target.value);
                }}
              />
            </div>

            {user && (
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  value={user.email}
                  disabled
                  className="dark:border-gray-500"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="profile-website">Phone</Label>
              <Input
                id="profile-website"
                disabled={!edit}
                placeholder="+123456789"
                className="dark:border-gray-500"
                type="tel"
                value={phoneValue}
                onChange={(event) => {
                  handlePhone(event.target.value);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea
                id="profile-bio"
                placeholder="Tell us about yourself..."
                disabled={!edit}
                className="dark:border-gray-500"
                rows={4}
                value={bioValue}
                onChange={(event) => {
                  handleBio(event.target.value);
                }}
              />
            </div>

            <Button
              variant="destructive"
              onClick={async () => {
                await signOut();
                window.location.reload();
              }}
            >
              Log out
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
export default ProfileAccountTab;
