"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import DisplayedEvents from "./displayedEvents";

const DisplayEventsBtn: React.FC = () => {
  const displayEventsBtnRef = useRef<HTMLButtonElement>(null!);
  const { searchParams, handleSearch } = useAddSearchQuery();
  const displayIsActive = searchParams.get("display-events");

  const openDrawer = () => {
    setTimeout(() => {
      displayEventsBtnRef?.current.click();
    }, 1);
  };

  useEffect(() => {
    if (displayIsActive) openDrawer();
  }, [displayIsActive]);

  return (
    <>
      {displayIsActive && (
        <DisplayedEvents
          buttonRef={displayEventsBtnRef}
          setSearchParams={handleSearch}
        />
      )}
      <Button
        onClick={() => {
          handleSearch("display-events", "true");
        }}
        className="rounded-full px-8 py-6 text-base font-bold text-white md:p-8"
      >
        Display all Events
      </Button>
    </>
  );
};

const DisplayEventsBtnWrapper: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DisplayEventsBtn />
  </Suspense>
);

export default DisplayEventsBtnWrapper;
