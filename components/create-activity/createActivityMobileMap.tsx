"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import MapWrapper from "../map/map";
import { DialogTitle } from "@mui/material";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

interface CreateActivityMobileMapProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const CreateActivityMobileMap: React.FC<CreateActivityMobileMapProps> = ({
  buttonRef,
}) => {
  const [mapKey, setMapKey] = useState<string>("");

  useEffect(() => {
    fetch("/api/use-secret")
      .then((res) => res.json())
      .then((data) => setMapKey(data));
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
          <MapWrapper API_KEY={mapKey} height="h-96" displayEvents={false} />
          <DialogClose>
            <Button type="button">Confirm Location</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CreateActivityMobileMap;
