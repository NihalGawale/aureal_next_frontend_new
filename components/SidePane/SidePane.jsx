"use client"
import React, { useEffect } from "react";
import PeerList from "../PeerList/PeerList";
import ChatContainer from "../Chat/ChatContainer";
import { usePeerContext } from "@/contexts/PeerContext";

const SidePane = () => {
  const {showPeerList, setShowPeerList} = usePeerContext();
  // console.log(showPeerList,"side pane showpeerlist-----");
  return (
    <div
      id="side-pane"
      className=" w-[100%] h-[100%]  bg-[#0f1214] flex flex-col "
    >
      <div className="w-[100%] h-[8%] flex justify-center items-center ">
        <div className="w-[80%] h-[70%] rounded-full flex justify-center items-center space-x-5 bg-[#636466] text-[8px] lg:text-[13px] 2xl:text-sm">
          <button  className={` lg:px-[11px] lg:py-[6px] 2xl:px-5 2xl:py-2  rounded-full text-white ${showPeerList ? "bg-[#363636]" : "bg-[#09090a]"} `} onClick={()=> {setShowPeerList(false)}}>Live Chat</button>
          <button className={`  lg:px-[11px] lg:py-[6px] 2xl:px-5 2xl:py-2 rounded-full text-white ${showPeerList ? "bg-[#09090a]" : "bg-[#363636]"}`} onClick={()=> {setShowPeerList(true)}}>
            Room Members
          </button>
        </div>
      </div>
      <div className="w-[100%] h-[92%]">
        {showPeerList ? <PeerList /> : <ChatContainer />}
      </div>
    </div>
  );

  // if (showPeerList == true) {
  //   return <PeerList />;
  // } else {
  //   return <ChatContainer />;
  // }
};

export default SidePane;
