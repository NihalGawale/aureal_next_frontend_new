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
  const {
    handleLocalStorage,
    deleteDataOnLeave,
    userData,
  } = useUserContext();

  // let { roomCode,roomId } = params;
 let roomCode = params.roomCode[0];
 let roomId = params.roomCode[1]
 let role = handleLocalStorage("get", "userRole");
 if(role == null){
   handleLocalStorage("set", "userRole","listener");

 }
  console.log(roomCode,roomId,"dynamic route------");
  handleLocalStorage("set", "roomCode", roomCode);
  let room_id = handleLocalStorage("get", "roomId", roomId);
  console.log(room_id,"room_id checking for guest");
  if(room_id == null) {
    handleLocalStorage("set", "roomId", roomId);
  }

  const hmsActions = useHMSActions();
  const router = useRouter();

  let userName = handleLocalStorage("get", "userName");
  let userId = handleLocalStorage("get", "user_id");
  console.log(userId,"userId checking for guest");
  if(userId == null){
    handleLocalStorage("set","user_id","1234");
  }
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
        userId : handleLocalStorage("get", "user_id") 
      }),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };
    try{
      await hmsActions.join(config);
    }catch(e){
      alert("Host has ended the Room!")
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
      metaData: JSON.stringify({ userImage: userData?.img || "",  user_id: userData.id || "1234"}),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };
    try{
      await hmsActions.join(config);
    }catch(e){
      alert("This room is not active!")
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
    console.log("Connecting")
    return <div>Loading...........</div>;

  } else if (isConnected == false && isGuest == null) {
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className=" bg-red-600">
          You are not connected to the room! Please Join. Or check out other
          rooms!
        </div>
        <Button
          onClick={() => {
            handleOnClick();
          }}
        >
          Join Again
        </Button>
        <Button
          onClick={() => {
            handleBack();
          }}
        >
          Back to Liverooms
        </Button>
      </div>
    );
  } else if (isConnected == false && isGuest == "yes") {
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className=" bg-red-600">
          You are not connected to the room! Please Join. Or check out other
          rooms!
        </div>
        <Button
          onClick={() => {
            handleOnClick();
          }}
        >
          Join Again
        </Button>
        <a href="https://aureal.one/">Check out Aureal One</a>
      </div>
    );
  } else if (roomState == "Disconnected" && isGuest == null) {
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className=" bg-red-600">The Room had Ended</div>

        <Button
          onClick={() => {
            handleBack();
          }}
        >
          Back to Liverooms
        </Button>
      </div>
    );
  } else if (roomState == "Disconnected" && isGuest == "yes") {
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className=" bg-red-600">The Room had Ended</div>

        <a href="https://aureal.one/home">Check out Aureal One</a>
      </div>
    );
  }
};

export default page;
