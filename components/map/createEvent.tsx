import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import useScreenSize from "@/lib/hooks/useScreenSize";
import CreateEventForm from "./createEventForm";

const snapPoints = [0.5, 1];

interface CreateEventProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  //   event: EventEntity;
  setSearchParams: (query: string, value: string) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({
  buttonRef,
  setSearchParams,
}) => {
  const { isMobile } = useScreenSize();
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <>
      <Drawer
        snapPoints={isMobile ? snapPoints : [1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        direction={isMobile ? "bottom" : "right"}
        onClose={() => {
          setSearchParams("create-event", "");
        }}
      >
        <DrawerTrigger ref={buttonRef} className="hidden"></DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerPortal>
          <DrawerContent
            // headerChildren={
            //   <Link href={`/${event.id}`} className="absolute right-5 top-4">
            //     <MdOutlineOpenInNew className="linear-yellow duration-300 hover:text-primary" />
            //   </Link>
            // }
            className="mx-[-1px] flex h-full w-full flex-col border-0 bg-white"
          >
            <div className="flex h-screen w-full flex-col overflow-y-auto">
              <DrawerHeader className="relative">
                <DrawerTitle className="mt-3 text-center text-xl font-bold">
                  Publish an Event
                </DrawerTitle>
                <DrawerDescription className="text-left text-base"></DrawerDescription>
              </DrawerHeader>
              <CreateEventForm />
              <DrawerFooter className="flex flex-col gap-2 md:flex-row-reverse">
                <DrawerClose className="h-12 bg-transparent p-2">
                  Cancel
                </DrawerClose>
              </DrawerFooter>
              {snap !== 1 && isMobile && (
                <div className="min-h-96 w-full"></div>
              )}
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </>
  );
};
export default CreateEvent;
