import { useRoomContext } from "@/contexts/RoomContext";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import RoomCards from "./RoomCards";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

function ListRooms({ rooms }) {
  let enabledRooms = [];

  const { setDescription } = useRoomContext();
  const { handleLocalStorage } = useUserContext();
  const router = useRouter();

  function handleCardClick(room) {
    handleLocalStorage("set", "roomId", room.id);
    handleLocalStorage("set", "roomName", room.name);
    setDescription(room.description);
    router.push("/liverooms/preview");
  }

  if (rooms.length > 0) {
    return (
      <>
        {rooms.map((room) => {
          if (room.enabled === true) {
            return (
              <div
                id="room-card-wrapper"
                key={room.id}
                onClick={() => {
                  handleCardClick(room);
                }}
                className={
                  `flex  w-auto h-auto ` +
                  (enabledRooms.length <= 4
                    ? "justify-center items-start pt-10"
                    : "justify-center items-center")
                }
              >
                <RoomCards key={room.id} room={room} />
              </div>
            );
          }
        })}
      </>
    );
  } else {
    return (
      <div className="flex w-full items-center justify-center  p-5 ">

    <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>

</div>
    );
  }
}

export default ListRooms;