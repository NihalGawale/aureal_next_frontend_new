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
  const { isLocalVideoEnabled } = useAVToggle();
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
      console.log(mgAccessToken, "mgaccesstken");
      console.log("init called");
      if (mgAccessToken == undefined) {
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
  } else {
    return(
      <div className="w-full h-[41%] flex justify-center items-center">
      <div className="w-[80%] h-full bg-[#1a1a1a] rounded-2xl">
        <div className="text-center flex items-center justify-center w-full h-full">
          <div role="status" >
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            {/* <span className="sr-only">Loading...</span> */}
          </div>
        </div>

     
      </div>
      
    </div>
    )
  
  }
};

export default Preview;
