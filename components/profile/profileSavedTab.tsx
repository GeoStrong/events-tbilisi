import React from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ProfileSavedTab: React.FC = () => {
  return (
    <>
      <TabsContent value="saved" className="space-y-4">
        <Card className="dark:bg-gray-800">
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
                        <Badge variant="outline">{event.category}</Badge>
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
    </>
  );
};
export default ProfileSavedTab;
