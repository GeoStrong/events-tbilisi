import React from "react";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Socials: React.FC = () => {
  return (
    <>
      <div className="mt-2 flex items-center gap-3">
        <Link href="">
          <BsFacebook />
        </Link>
        <Link href="">
          <BsInstagram />
        </Link>
        <Link href="">
          <BsWhatsapp />
        </Link>
        <Link href="">
          <BsPinterest />
        </Link>
        <Link href="">
          <BsLinkedin />
        </Link>
      </div>
    </>
  );
};
export default Socials;
