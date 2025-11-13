import React from "react";
import { TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Bell, Globe, Mail, Palette } from "lucide-react";
import { Label } from "../ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";

const ProfilePreferencesTab: React.FC = () => {
  return (
    <>
      <TabsContent value="preferences" className="space-y-4">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email-notif">Email Notifications</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about events and activities.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="event-reminders">Event Reminders</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get reminders before your saved events start.
                </p>
              </div>
              {/* <Switch
                        id="event-reminders"
                        checked={eventReminders}
                        onCheckedChange={setEventReminders}
                      /> */}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="newsletter">Newsletter Subscription</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Subscribe to our weekly newsletter with curated events.
                </p>
              </div>
              {/* <Switch
                        id="newsletter"
                        checked={newsletterSubscription}
                        onCheckedChange={setNewsletterSubscription}
                      /> */}
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Display Preferences</CardTitle>
            <CardDescription>
              Customize your viewing experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <Label>Theme Preference</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Your theme is currently controlled by the toggle in the header.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
export default ProfilePreferencesTab;
