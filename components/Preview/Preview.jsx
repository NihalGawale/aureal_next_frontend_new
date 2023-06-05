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
import { useRoomContext } from "@/contexts/RoomContext";

const Preview = () => {
  const { remotePeers, level } = usePeerContext();
  const hmsActions = useHMSActions();
  const { handleLocalStorage, mgAccessToken, checkAndGetToken } =
    useUserContext();
  const isInPreview = useHMSStore(selectIsInPreview);
  const {
    createRoomCodesByRole,
    createRoomCodes,
    hostRoomCode,
    listenerRoomCode,
    setHostRoomCode,
    setListenerRoomCode,
    roomCodes,
    roomId,
    setRoomId,
    setRoomCodes,
  } = useRoomContext();
  const [meetingUrl, setMeetingUrl] = useState("");

  const { isLocalVideoEnabled } = useAVToggle();
  const router = useRouter();
  const [userName, setUserName] = useState(
    handleLocalStorage("get", "userName") || ""
  );
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  ///////////////////////////////////////
  let token;
  let response;

  async function init() {
    let room_id = handleLocalStorage("get", "roomId");
    setRoomId(room_id);
    let room_name = handleLocalStorage("get", "roomName");
    let role = handleLocalStorage("get", "userRole");
    if (role == null) {
      handleLocalStorage("set", "userRole", "listener");
    }
    let roomCode = handleLocalStorage("get", "roomCode");
    console.log(room_id, room_name, role, "----------" );
    if (roomCode == null) {
      response = await createRoomCodes(room_id);
      // handleLocalStorage("set", "roomCodes", response.data);
      setRoomCodes(response.data);
      console.log(response, "Room Codes on Preview role is host");
      if (response) {
        response.data.map((data) => {
          if (data.role == role) {
            handleLocalStorage("set", "roomCode", data.code);
            if (role == "host") {
              setHostRoomCode(data.code);
            } else if (role == "listener") {
              setListenerRoomCode(data.code);
            }
          }
        });
      }
    }
    // if (roomCode == null) {
    //   console.log("Generating Room Code");
    //   response = await createRoomCodesByRole(room_id, role);
    //   console.log(response, "Room Codes on Preview");
    //   // Code as per user role
    //   handleLocalStorage("set", "roomCode", response.code);
    //   roomCode = response.code;
    // }
    if (mgAccessToken == undefined) {
      checkAndGetToken("mg-access-token", room_id);
    }
    if (role == "host") {
      setMeetingUrl(
        `/liverooms/meeting/${handleLocalStorage("get", "roomCode")}/${room_id}`
      );
    } else if (role == "listener") {
      setMeetingUrl(
        `/liverooms/meeting/${handleLocalStorage("get", "roomCode")}/${room_id}`
      );
    }

    if (role == "host") {
      console.log("requesting auth token");
      token = await hmsActions.getAuthTokenByRoomCode({
        roomCode: handleLocalStorage("get", "roomCode"),
      });
      console.log(token);
      handleLocalStorage("set", "authToken", token);
    } else if (role == "listener") {
      token = await hmsActions.getAuthTokenByRoomCode({
        roomCode: handleLocalStorage("get", "roomCode"),
      });
      console.log(token);
      handleLocalStorage("set", "authToken", token);
    }

    const config = {
      userName: userName,
      authToken: token, // client-side token generated from your token service
      settings: {
        // initial states
        isAudioMuted: true,
        isVideoMuted: false,
      },
      metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };

    if (token) {
      await hmsActions.preview(config);
    }
  }

  const handleOnClick = () => {
    if (!userName) {
      alert("Name is required");
    } else {
      console.log(meetingUrl);
      handleLocalStorage("set", "userName", userName);
      router.push(meetingUrl);
    }
  };

  useEffect(() => {
    init();
  }, []);
  if (isInPreview) {
    return (
      <div className="w-full h-[41%] flex justify-center items-center">
        <div className="w-[80%] h-full bg-[#1a1a1a] rounded-2xl">
          <div className="w-full h-[5%]  pt-8 flex justify-end items-center pr-5">
            <ShareRoomUrl roomCode={listenerRoomCode} roomId={roomId} />
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
                required={true}
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
  }else{
    return <div>Loading...</div>
  }
};

export default Preview;
