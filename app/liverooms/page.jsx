"use client";

import { useUserContext } from "@/contexts/UserContext";
import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./components/Header";
import Body from "./components/Body";
import CreateRoomButton from "./components/CreateRoomButton";
import ShowModal from "./components/ShowModal";
import { useRoomContext } from "@/contexts/RoomContext";
import {
  selectIsConnectedToRoom,
  selectRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";

const LiveRooms = () => {
  const {
    triggerFetchUserData,
    checkAndGetToken,
    handleLocalStorage,
    deleteDataOnLeave,
  } = useUserContext();

  const { showModal } = useRoomContext();

  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id");
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  handleLocalStorage("set", "user_id", user_id);

  const init = async () => {
    checkAndGetToken("mg-access-token");
    triggerFetchUserData(user_id);
  };

  useEffect(() => {
    init();
    deleteDataOnLeave();
  }, []);

  return (
    <>
      <Header />
      <Body />
      {showModal ? <ShowModal /> : null}
      <CreateRoomButton />
    </>
  );
};

export default LiveRooms;
