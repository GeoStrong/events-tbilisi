import React from "react";
import { TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { UserProfile } from "@/lib/types";

const ProfileAccountTab: React.FC<{ user: UserProfile | null }> = ({
  user,
}) => {
  return (
    <>
      <TabsContent value="account" className="space-y-4">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account security and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {user ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <Label>Password</Label>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Keep your account secure by updating your password
                    regularly.
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-destructive">Danger Zone</Label>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </>
            ) : (
              <div className="space-y-4 py-8 text-center">
                <div>
                  <p className="mb-2">
                    You&apos;re currently using a guest profile.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access account settings and sync your profile
                    across devices.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
export default ProfileAccountTab;
