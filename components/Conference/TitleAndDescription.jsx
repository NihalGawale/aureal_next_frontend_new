"use client"
import { useRoomContext } from "@/contexts/RoomContext";
import { useUserContext } from "@/contexts/UserContext";
import { selectRoom, useHMSStore } from "@100mslive/react-sdk";
import React, { useEffect } from "react";

const TitleAndDescription = ({ peers }) => {
  const {handleLocalStorage} = useUserContext();
  let room_id = handleLocalStorage("get","roomId");
  const {roomName,setRoomName,description,setDescription,getSpecificRoomData} = useRoomContext();
let response="";
  useEffect(()=>{
    const init = async() => {
      if (description == "" && room_id){
       response = await getSpecificRoomData(room_id)
        console.log(response,"title and description");
        setRoomName(response.name);
        setDescription(response.description);
      }
    }
   init();

  }, [])
  return (
    <div
      id="titleAndDesc"
      className="w-full h-[12%]  flex flex-col pl-10 pt-4 space-y-2 "
    >
      <div className="flex justify-between">
        <div
          id="title"
          className="text-2xl font-NotoSerifKhojki text-gray-200"
        >{roomName }</div>
        <div className="pr-20 pt-1">
          <div className=" w-auto h-auto px-4 py-2 bg-[#363636] text-white rounded-full text-sm font-normal font-Prompt">
            {peers.length == 1
              ? ` ${peers.length} Live Member`
              : ` ${peers.length} Live Members`}
          </div>
        </div>
      </div>

      <div
        id="description"
        className="text-sm  font-Merriweather break-words max-w-full flex flex-wrap pl-1 text-gray-400"
      >
        {description }
      </div>
    </div>
  );
};

export default TitleAndDescription;
