"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div
      id="header"
      className="flex  justify-between h-[8%] items-center pr-10 w-full bg-[#121111]  "
    >
      <div className="pl-8 flex space-x-3 ">
        <Image
          src="/assets/icons/icon-72-72.png"
          alt="aureal-logo"
          width={50}
          height={50}
        />
        <h2 className="text-white font-Poppins pt-2 text-3xl font-medium">
          Aureal
        </h2>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="pl-2 relative text-lg text-blue-400 font-medium">
          <Link href="https://aureal.one/home">Back to Aureal One</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
