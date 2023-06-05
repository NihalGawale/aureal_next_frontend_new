"use client";
import React, { useEffect, useRef, useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useRoomContext } from "@/contexts/RoomContext";
import ListRooms from "@/components/ListAllRooms/ListRooms";
import { useUserContext } from "@/contexts/UserContext";

const Body = () => {
  
  const [rooms, setRooms] = useState([]);
  const { listAllRooms } = useRoomContext();
  const { mgAccessToken, checkAndGetToken } = useUserContext();
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  async function listRooms() {
    let enabledRooms = []
    const resp = await listAllRooms();
    console.log(resp, "list all rooms------");
    resp.map((room) => {
      if (room.enabled === true) enabledRooms.push(room);
    });
    // console.log(enabledRooms.length,"enabledRooms");
    setRooms(enabledRooms);
  }

  
  useEffect(() => {
    const init = async () => {
      console.log("init called List Rooms");
      await checkAndGetToken("mg-access-token");
      if (mgAccessToken) {
        await listRooms();

        const interval = setInterval(() => {
          listRooms();
        }, 10000);

        return () => clearInterval(interval);
      }
    };
    init();
  }, [mgAccessToken ]);

  return (
    <div id="body" className="w-full h-[82%]  flex items-center">
      <div className="w-full h-[85%]  flex flex-col">
        <div className={`w-full h-[10%] px-[86px] flex items-center  text-2xl font-semibold justify-between `}>
          <div className="text-white">LiveRooms</div>
      
          <div className="space-x-5 ">
            <ArrowCircleLeftOutlinedIcon
              onClick={() => scroll(-1000)}
              style={{ fontSize: "27px" }}
              className=" hover:cursor-pointer text-gray-400"
            />
            <ArrowCircleRightOutlinedIcon
              onClick={() => scroll(1000)}
              style={{ fontSize: "27px" }}
              className="text-gray-400 hover:cursor-pointer"
            />
          </div>
        </div>
        <div
          ref={ref}
          className={
            `w-full h-[90%]  overflow-x-scroll grid grid-flow-col  scrollbar-hide scroll-smooth ` +
            ( rooms.length <= 4
              ? "grid-rows-1 grid-cols-4 px-16":
              rooms.length >4 && rooms.length <=6 ? " grid-rows-1 px-[82px]" 
              : rooms.length > 6 ? "grid-rows-2 px-[70px]"  : " ")
          }
        >
          <ListRooms rooms={rooms} />
        </div>
      </div>
    </div>
  );
};

export default Body;
