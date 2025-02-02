"use client";

import React, { Suspense, useRef } from "react";
import { Button } from "../ui/button";
import CreateEvent from "./createEvent";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";

const CreateEventBtn: React.FC = () => {
  const createEventBtnRef = useRef<HTMLButtonElement>(null!);
  const { handleSearch } = useAddSearchQuery();
  //   const createIsActive = searchParams.get("create-event");

  const openDrawer = () => {
    setTimeout(() => {
      createEventBtnRef?.current.click();
    }, 1);
  };

  return (
    <>
      <CreateEvent
        buttonRef={createEventBtnRef}
        setSearchParams={handleSearch}
      />
      <Button
        onClick={() => {
          handleSearch("create-event", "true");
          openDrawer();
        }}
        className="rounded-full px-8 py-6 text-base font-bold text-white md:p-8"
      >
        Create Event
      </Button>
    </>
  );
};

const CreateEventBtnWrapper: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateEventBtn />
  </Suspense>
);

export default CreateEventBtnWrapper;
