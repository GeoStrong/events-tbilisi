"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { ArrowLeft, Bell, Globe, Lock, Mail, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import ProfileHeader from "./profileHeader";

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
                        disabled={!editing}
                        placeholder="Enter your name"
                      />
                    </div>

                    {user && (
                      <div className="space-y-2">
                        <Label htmlFor="profile-email">Email</Label>
                        <Input id="profile-email" value={user.email} disabled />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="profile-bio">Bio</Label>
                      <Textarea
                        id="profile-bio"
                        placeholder="Tell us about yourself..."
                        disabled={!editing}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-location">Location</Label>
                      <Input
                        id="profile-location"
                        disabled={!editing}
                        placeholder="City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-website">Website</Label>
                      <Input
                        id="profile-website"
                        disabled={!editing}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Events</CardTitle>
                    <CardDescription>
                      Events you&apos;ve bookmarked for later.
                    </CardDescription>
                  </CardHeader>
                  {/* <CardContent>
                    {savedEvents.length > 0 ? (
                      <div className="space-y-4">
                        {savedEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
                          >
                            <div>
                              <h4 className="mb-1">{event.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{event.date}</span>
                                <Badge variant="outline">
                                  {event.category}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-8 text-center text-muted-foreground">
                        No saved events yet. Start exploring events to save your
                        favorites!
                      </p>
                    )}
                  </CardContent> */}
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <Card>
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
                          <Label htmlFor="email-notif">
                            Email Notifications
                          </Label>
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
                          <Label htmlFor="event-reminders">
                            Event Reminders
                          </Label>
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
                          <Label htmlFor="newsletter">
                            Newsletter Subscription
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Subscribe to our weekly newsletter with curated
                          events.
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

                <Card>
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
                        Your theme is currently controlled by the toggle in the
                        header.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-4">
                <Card>
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
                          <Label className="text-destructive">
                            Danger Zone
                          </Label>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Permanently delete your account and all associated
                            data.
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
                            Sign in to access account settings and sync your
                            profile across devices.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileLayout;
