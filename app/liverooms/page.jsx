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
import { selectIsConnectedToRoom, selectRoom, useHMSStore } from "@100mslive/react-sdk";

const LiveRooms = () => {
  const { triggerFetchUserData, checkAndGetToken, handleLocalStorage } =
    useUserContext();

  const { showModal } = useRoomContext();

  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id");
  // const isConnected = useHMSStore(selectIsConnectedToRoom);
  // const room = useHMSStore(selectRoom)
  // console.log(isConnected, "Is user Connected?")
  // console.log(room, "Which ROOM?")
  handleLocalStorage("set", "user_id", user_id);

  const init = async () => {
    checkAndGetToken("mg-access-token");
    triggerFetchUserData(user_id);
  };

  useEffect(() => {
    init();
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
