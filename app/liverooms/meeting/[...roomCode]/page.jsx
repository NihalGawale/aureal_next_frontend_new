"use client";
import CallWrapper from "@/components/Conference/CallWrapper";
import { useUserContext } from "@/contexts/UserContext";
import {
  selectIsConnectedToRoom,
  selectRoomState,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = ({ params }) => {
  const { handleLocalStorage, deleteDataOnLeave, userData } = useUserContext();

  // let { roomCode,roomId } = params;
  let roomCode = params.roomCode[0];
  let roomId = params.roomCode[1];
  let role = handleLocalStorage("get", "userRole");
  if (role == null) {
    handleLocalStorage("set", "userRole", "listener");
  }
  console.log(roomCode, roomId, "dynamic route------");
  handleLocalStorage("set", "roomCode", roomCode);
  let room_id = handleLocalStorage("get", "roomId", roomId);
  console.log(room_id, "room_id checking for guest");
  if (room_id == null) {
    handleLocalStorage("set", "roomId", roomId);
  }
  let userId = handleLocalStorage("get", "user_id");
  console.log(userId, "userId checking for guest");
  if (userId == null) {
    handleLocalStorage("set", "user_id", "1234");
  }

  const hmsActions = useHMSActions();
  const router = useRouter();

  let userName = handleLocalStorage("get", "userName");

  let authToken;

  const pushToPreview = () => {
    return router.push("/liverooms/preview");
  };
  const handleOnClick = async () => {
    const config = {
      userName: handleLocalStorage("get", "userName") || "guest-user",
      authToken: handleLocalStorage("get", "authToken"),
      settings: {
        // initial states
        isAudioMuted: true,
        isVideoMuted: false,
      },
      metaData: JSON.stringify({
        userImage: handleLocalStorage("get", "userImage") || "",
        userId: handleLocalStorage("get", "user_id"),
      }),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };
    try {
      await hmsActions.join(config);
    } catch (e) {
      alert("Host has ended the Room!");
    }
  };

  const init = async () => {
    const config = {
      userName: userName || "guest-user",
      authToken: handleLocalStorage("get", "authToken"),
      settings: {
        // initial states
        isAudioMuted: true,
        isVideoMuted: false,
      },
      metaData: JSON.stringify({
        userImage: userData?.img || "",
        user_id: userData.id || handleLocalStorage("get", "user_id"),
      }),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };
    try {
      await hmsActions.join(config);
    } catch (e) {
      alert("This room is not active!");
    }
  };

  function handleBack() {
    deleteDataOnLeave();
    router.push(`/liverooms?user_id=${handleLocalStorage("get", "user_id")}`);
  }
  const roomState = useHMSStore(selectRoomState);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const isGuest = handleLocalStorage("get", "isGuest");

  useEffect(() => {
    authToken = handleLocalStorage("get", "authToken");
    if (authToken == null) {
      pushToPreview();
      handleLocalStorage("set", "isGuest", "yes");
    } else {
      init();
    }
  }, [authToken]);

  if (roomState == "Connected") {
    return <CallWrapper></CallWrapper>;
  } else if (roomState == "Connecting") {
    console.log("Connecting");
    return <div>Loading...........</div>;
  } else if (isConnected == false && isGuest == null) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center ">
        <div className="top-[50%] left-[50%] h-[35%] w-[35%] bg-gray-700 flex flex-col items-center rounded-md">
          <div className="h-3/4 p-2">
            <div className=" text-5xl mb-3 font-Poppins text-white font-bold pt-5">
              Aureal Live Rooms
            </div>
            <div className="font-Poppins text-lg text-red-600 p-3">
              You are not connected to the room. Exited by mistake? You can join
              again. Or check out Aureal Live Rooms.
            </div>
          </div>
          <div className="flex flex-row w-full flex-2 h-1/4 items-center justify-center space-x-5">
            <Button
              style={{ color: "white", background: "#0099ff", font: "30px" }}
              onClick={() => {
                handleOnClick();
              }}
            >
              Join Again
            </Button>
            <Button
              style={{ color: "white", background: "red", font: "30px" }}
              onClick={() => {
                handleBack();
              }}
            >
              Back to Liverooms
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (isConnected == false && isGuest == "yes") {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center ">
        <div className="top-[50%] left-[50%] h-[35%] w-[35%] bg-gray-700 flex flex-col items-center rounded-md">
          <div className="h-3/4 p-2">
            <div className=" text-5xl mb-3 font-Poppins text-white font-bold pt-5">
              Aureal Live Rooms
            </div>
            <div className="font-Poppins text-lg text-red-600 p-3">
              You are not connected to the room. Exited by mistake? You can join
              again. Or check out Aureal Live Rooms.
            </div>
          </div>
          <div className="flex flex-row w-full flex-2 h-1/4 items-center justify-center space-x-5">
            <Button
              style={{ color: "white", background: "#0099ff", font: "30px" }}
              onClick={() => {
                handleOnClick();
              }}
            >
              Join Again
            </Button>
            <a style={{ color: "white", background: "#0099ff", font: "30px" }} href="https://aureal.one/">Check out Aureal One</a>
          </div>
        </div>
      </div>
    );
  } else if (roomState == "Disconnected" && isGuest == null) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center ">
        <div className="top-[50%] left-[50%] h-[35%] w-[35%] bg-gray-700 flex flex-col items-center rounded-md">
          <div className="h-3/4 p-2">
            <div className=" text-5xl mb-3 font-Poppins text-white font-bold pt-5">
              Aureal Live Rooms
            </div>
            <div className="font-Poppins text-lg text-red-600 p-3">
              The Room was ended by the host.
            </div>
          </div>
          <div className="flex flex-row w-full flex-2 h-1/4 items-center justify-center space-x-5">
            <Button
              style={{ color: "white", background: "red", font: "30px" }}
              onClick={() => {
                handleBack();
              }}
            >
              Back to Liverooms
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (roomState == "Disconnected" && isGuest == "yes") {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center ">
        <div className="top-[50%] left-[50%] h-[35%] w-[35%] bg-gray-700 flex flex-col items-center rounded-md">
          <div className="h-3/4 p-2">
            <div className=" text-5xl mb-3 font-Poppins text-white font-bold pt-5">
              Aureal Live Rooms
            </div>
            <div className="font-Poppins text-lg text-red-600 p-3">
              The Room was ended by the host.
            </div>
          </div>
          <div className="flex flex-row w-full flex-2 h-1/4 items-center justify-center space-x-5">
            <a style={{ color: "white", background: "#0099ff", font: "30px" }} href="https://aureal.one/home">Check out Aureal One</a>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
