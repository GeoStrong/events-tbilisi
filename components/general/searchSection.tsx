import Image from "next/image";
import React from "react";
import imgTbilisi from "@/public/images/tbilisi.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchSection: React.FC = () => {
  return (
    <div className="relative mb-8 w-full">
      <Image
        src={imgTbilisi.src}
        width={200}
        height={100}
        className="h-[30rem] w-full object-cover object-top brightness-50"
        alt="Tbilisi"
        unoptimized
      />
      <div className="absolute top-1/2 flex w-full flex-col items-center gap-3">
        <h1 className="text-center text-4xl font-bold text-white">
          Discover Social Activities in Tbilisi
        </h1>
        <div className="flex items-center md:w-1/2">
          <Input
            type="text"
            className="rounded-full rounded-r-none border-none bg-white p-6 focus:placeholder:text-primary"
            placeholder="Search Events, Places"
          />
          <Button
            type="submit"
            className="rounded-full rounded-l-none border-none bg-primary p-6 text-white md:px-10"
            variant="outline"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SearchSection;
