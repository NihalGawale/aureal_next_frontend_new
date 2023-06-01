"use client";
import {
  selectIsConnectedToRoom,
  selectPeers,
  selectRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Footer from "../Footer/Footer";
import SidePane from "../SidePane/SidePane";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useUserContext } from "@/contexts/UserContext";
import ConferenceComponent from "./ConferenceComponent";
import TitleAndDescription from "./TitleAndDescription";
import ConferenceFooter from "./ConferenceFooter";

function Conference() {
  const peers = useHMSStore(selectPeers);

  const { handleLocalStorage } = useUserContext();
  const host = peers.find((peer) => peer.roleName === "host");
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  
  console.log(isConnected);
  const room = useHMSStore(selectRoom);
  console.log(room, "room object");


  if (room && isConnected) {
    return (
      <div className="w-[100%] h-[100%] flex ">
        <div className="w-[80%] h-full">
          <div id="Conference" className=" h-full w-full   bg-black">
            <ConferenceComponent peers={peers} host={host} />
            <TitleAndDescription peers={peers} />
            <ConferenceFooter
              peersLength={peers.length}
              host={host}
              room={room}
            />
          </div>
        </div>
        <div className="w-[20%] h-full  flex justify-center items-center">
          <SidePane />
        </div>
      </div>
    );
  }
}

export default Conference;
