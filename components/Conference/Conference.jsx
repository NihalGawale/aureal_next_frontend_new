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

  const { handleLocalStorage} = useUserContext();
  const host = peers.find((peer) => peer.roleName === "host");
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  console.log(isConnected);
  const room = useHMSStore(selectRoom);
  console.log(room,"room object");
  const handleOnClick = async () => {

    const config = {
      userName: handleLocalStorage('get', "userName") || "guest-user",
      authToken: handleLocalStorage('get', "auth-token"),
      settings: {
        // initial states
        isAudioMuted: true,
        isVideoMuted: false,
      },
      metaData: JSON.stringify({ userImage: handleLocalStorage('get', "userImage") || "" }),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };
    await hmsActions.join(config);
  };

  if (room && isConnected) {
    return (
      <div className="w-[100%] h-[100%] flex ">
        <div className="w-[80%] h-full">
          <div id="Conference" className=" h-full w-full   bg-black">
          <ConferenceComponent peers={peers} host={host}/>
         <TitleAndDescription peers={peers} />
           <ConferenceFooter peersLength={peers.length} host={host} room={room}/>
          </div>
        </div>
        <div className="w-[20%] h-full  flex justify-center items-center">
          <SidePane />
        </div>
      </div>
    );
  } else if (room && isConnected == false) {
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[45%] h-[50%] bg-red-600"> It looks like you got disconnected for some reason! The page might have been refreshed. Please join again</div>
        <Button
          onClick={() => {
            handleOnClick()
          }}
        >
          Join Again
        </Button>
      </div>
    );
  } 
}

export default Conference;
