import React from "react";
import CreateEventBtn from "./createEventBtn";

const Welcome: React.FC = () => {
  return (
    <div className="hidden flex-col p-4 md:flex lg:w-1/2">
      <div className="mb-5 text-muted-foreground">
        <h1 className="mb-5 text-center text-2xl font-bold text-black dark:text-white">
          Create a New Event
        </h1>
        <p className="text-center">
          Getting ready to <strong>host an event</strong>?{" "}
          <span className="text-base">
            - It’s never been easier or more thrilling, and best of all, it
            won’t cost you a{" "}
            <span className="linear-yellow text-base">dime!</span>
          </span>
        </p>
        <p className="mt-3 text-center">
          Whether you&apos;re planning an electrifying{" "}
          <strong>music concert</strong>, a nail-biting sports competition, or a
          heartwarming <strong>charity fundraiser</strong>, the possibilities
          are endless.{" "}
        </p>
        <p className="mt-3 text-center">
          Dreaming up a <strong>one-of-a-kind</strong> occasion?{" "}
          <span className="text-base">
            - We’re here to support you and bring your vision to life every step
            of the way!
          </span>
        </p>
        <p className="mt-3 text-center">
          To make sure your event shines and grabs everyone’s attention, don’t
          forget to include all the <strong>key details</strong>{" "}
          <span className="">
            - like the <strong>date, time, venue,</strong> and any special
            activities you have in store
          </span>
        </p>
        <p className="mt-3 text-center">
          Ready to jumpstart your <strong>planning</strong>?{" "}
          <span className="">
            - Just click on the <strong>interactive map</strong> to select your
            perfect <strong>location</strong> or hit the handy button below
          </span>
        </p>
        <p className="mt-3 text-center">
          We can’t wait to see your amazing ideas come to fruition and help you
          spread the word about your incredible{" "}
          <span className="linear-yellow text-base">plans</span>!
        </p>
        <p className="mt-3 text-center">Let’s make some magic happen! ✨</p>
        <div className="mt-10 flex w-full justify-center">
          <CreateEventBtn />
        </div>
      </div>
    </div>
  );
};
export default Welcome;
