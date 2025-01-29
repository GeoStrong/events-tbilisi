import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white px-6 py-4 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-around md:items-start">
        <Link className="text-lg" href="/">
          Events
        </Link>
        <Link className="text-lg" href="/Map">
          Map
        </Link>
        <Link className="text-lg" href="/About">
          About Us
        </Link>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-3 md:flex-row">
        <div className=""></div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Events-Tbilisi. All rights reserved.
        </p>
        <div className="flex gap-2">
          <Link href="https://github.com/GeoStrong" target="_blank">
            <BsGithub className="text-lg" />
          </Link>
          <Link href="https://www.facebook.com/jobava.giorgi5/" target="_blank">
            <BsFacebook className="text-lg" />
          </Link>
          <Link href="https://www.instagram.com/gio.jobava_/" target="_blank">
            <BsInstagram className="text-lg" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/giorgi-jobava/"
            target="_blank"
          >
            <BsLinkedin className="text-lg" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
