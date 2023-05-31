"use client";
import Conference from "@/components/Conference/Conference";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = ({ params }) => {
  const { handleLocalStorage } = useUserContext();
  const roomName = params.roomName[0];
  const roomId = params.roomName[1];
  let userName = "";
  const router = useRouter();
  if (typeof window !== "undefined") {
    userName = handleLocalStorage("get", "userName");
    handleLocalStorage("set", "roomId", roomId);
    handleLocalStorage("set", "roomName", roomName);
  }

  const pushToPreview = async () => {
    return router.push("/liverooms/preview");
  };
  async function init() {
    if (userName == null || undefined || "") {
      pushToPreview();
    }
  }

  init();

  if (userName == null || undefined || "") {
    return (
      <div>
        <div
          className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex flex-col bg-[#080808]">
        <Conference />
      </div>
    );
  }
};

export default page;
