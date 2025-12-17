"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import MapWrapper from "../map/map";
import { Button } from "../ui/button";

interface CreateActivityMobileMapProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const CreateActivityMobileMap: React.FC<CreateActivityMobileMapProps> = ({
  buttonRef,
}) => {
  const [mapKey, setMapKey] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/use-secret");

      const { key } = await response.json();
      setMapKey(key);
    })();
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger ref={buttonRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Choose the location
            </DialogTitle>
            <DialogDescription>
              Simply Click on the Map to put your pinpoint
            </DialogDescription>
          </DialogHeader>
          <MapWrapper
            API_KEY={mapKey}
            height="h-96"
            displayActivities={false}
          />
          <DialogClose>
            <Button type="button">Confirm Location</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CreateActivityMobileMap;
