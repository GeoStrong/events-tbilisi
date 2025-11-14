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

interface ProfileAboutTabProps {
  user: UserProfile | null;
  edit: boolean;
}

const ProfileAboutTab: React.FC<ProfileAboutTabProps> = ({ user, edit }) => {
  return (
    <>
      <TabsContent value="about" className="space-y-4">
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
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
export default ProfileAboutTab;
