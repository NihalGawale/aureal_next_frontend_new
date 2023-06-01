"use client";
import Conference from "@/components/Conference/Conference";
import { useUserContext } from "@/contexts/UserContext";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CallWrapper = ({ roomId, roomName }) => {
  const { handleLocalStorage } = useUserContext();

  let userName = "";
  let userImage = "";

  const router = useRouter();
  userName = handleLocalStorage("get", "userName");
  userImage = handleLocalStorage("get", "useImage");
  const pushToPreview = async () => {
    return router.push("/liverooms/preview");
  };
  if (userName == null) {
    pushToPreview();
  }

  handleLocalStorage("set", "roomId", roomId);
  handleLocalStorage("set", "roomName", roomName);


  if (!userName) {
    return null;
  }

  if (userName) {
    return (
      <div className="w-screen h-screen flex flex-col bg-[#080808]">
        <Conference />
      </div>
    );
  }
};

export default CallWrapper;
