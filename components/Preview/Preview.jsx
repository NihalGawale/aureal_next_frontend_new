import React, { useEffect, useState } from "react";
import ShareRoomUrl from "../ShareRoomUrl/ShareRoomUrl";
import PreviewTile from "./PreviewTile";
import PreviewControls from "./PreviewControls";
import { Button, Input } from "@mui/material";
import { usePeerContext } from "@/contexts/PeerContext";
import {
  selectIsConnectedToRoom,
  selectIsInPreview,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import PreviewUserCard from "./PreviewUserCard";

const Preview = () => {
  const { remotePeers, level } = usePeerContext();
  const hmsActions = useHMSActions();
  const {
    checkAndGetToken,
    userData,
    userRole,
    authToken,
    mgAccessToken,
    handleLocalStorage,
  } = useUserContext();
  console.log(remotePeers.length, "remote peers-------");
  const {  isLocalVideoEnabled } = useAVToggle();
  const router = useRouter();
  const [userName, setUserName] = useState(
    handleLocalStorage("get", "userName") || ""
  );
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  let room_id;
  let room_name;

  if (typeof window !== "undefined") {
    room_id = handleLocalStorage("get", "roomId");
    room_name = handleLocalStorage("get", "roomName");
  }

  const isInPreview = useHMSStore(selectIsInPreview);
  const isConnectedToRoom = useHMSStore(selectIsConnectedToRoom);
  const config = {
    userName: userName || "guest-user",
    authToken: authToken,
    settings: {
      // initial states
      isAudioMuted: true,
      isVideoMuted: false,
    },
    metaData: JSON.stringify({ userImage: userData?.img || "" }),
    rememberDeviceSelection: true, // remember manual device change
    captureNetworkQualityInPreview: false, // whether to measure network score in preview
  };

  const handleOnClick = async () => {
    if (typeof window !== "undefined") {
      if (userName) handleLocalStorage("set", "userName", userName);
    }
    console.log(room_name, room_id, "Check before join");
    router.push(`/liverooms/${room_name}/${room_id}`);
    await hmsActions.join(config);
  };

  useEffect(() => {
    const init = async () => {
      console.log(mgAccessToken,"mgaccesstken");
      console.log("init called");
      if(mgAccessToken == undefined){
        checkAndGetToken("mg-access-token", room_id, userRole);
      }
      await checkAndGetToken("auth-token", room_id, userRole);
      if (authToken) {
        await hmsActions.preview(config);
      }
    };

    init();
  }, [authToken]);

  if (isInPreview && !isConnectedToRoom) {
    return (
      <div className="w-full h-[41%] flex justify-center items-center">
        <div className="w-[80%] h-full bg-[#1a1a1a] rounded-2xl">
          <div className="w-full h-[5%]  pt-8 flex justify-end items-center pr-5">
            <ShareRoomUrl />
          </div>
          <div className="h-[75%] w-full  flex justify-center items-center">
            <div
              className="w-[50%] relative overflow-hidden h-[80%] bg-black border-[3px] border-[#1a1a1a] rounded-2xl flex justify-center items-center"
              style={{
                borderColor: `${level >= 20 ? "#3d5afe" : ""} `,
              }}
            >
              {isLocalVideoEnabled ? <PreviewTile /> : <PreviewUserCard />}
              <div className="w-full h-[15%] absolute bottom-2 ">
                <PreviewControls />
              </div>
            </div>
          </div>
          <div className="h-[20%] w-full pb-5">
            <div className=" h-[80%] w-full flex justify-center items-end space-x-4">
              <Input
                id="outlined-basic"
                value={userName}
                placeholder="Enter you name"
                onChange={(e) => handleChangeUserName(e)}
                sx={{ input: { color: "white", fontSize: "20px" } }}
              />

              <Button
                variant="contained"
                onClick={() => {
                  handleOnClick();
                }}
              >
                Join Room
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Preview;
