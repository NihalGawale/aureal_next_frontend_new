"use client";
import Preview from "@/components/Preview/Preview";
import Image from "next/image";
import React from "react";

const preview = () => {
  return (
    <div id="preview-page" className="w-screen h-screen flex bg-black">
      <div
        id="preview-left-div"
        className="w-6/12 h-full flex flex-col space-y-10 text-white"
      >
        <div className="w-full h-[25%] flex flex-col justify-end pl-24">
          <div className=" text-7xl mb-3 font-Poppins font-bold">
            Aureal Live Rooms
          </div>
          <div className="font-Poppins text-xl">
            Connect with your audience, friends and family...
          </div>
        </div>
        <Preview />
      </div>

      <div
        id="preview-right-div"
        className="w-6/12 h-full flex justify-center items-center"
      >
        <Image
          src="/assets/preview-img.webp"
          width={650}
          height={0}
          className="rounded-xl"
          alt="preview-image"
        />
      </div>
    </div>
  );
};

export default preview;
