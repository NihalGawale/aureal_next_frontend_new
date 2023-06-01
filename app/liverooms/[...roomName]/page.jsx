"use client"
import CallWrapper from "@/components/Conference/CallWrapper";
import { useUserContext } from "@/contexts/UserContext";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const roomName = params.roomName[0];
  const roomId = params.roomName[1];
  const {handleLocalStorage}  = useUserContext();
  handleLocalStorage('set', "roomId", roomId);
  handleLocalStorage('set', "roomName", roomName);
  
  const hmsActions = useHMSActions();
  const router = useRouter();

  let userName = handleLocalStorage("get", "userName");
  const pushToPreview = () => {
    return router.push("/liverooms/preview");
  };
  if (userName == null) {
    pushToPreview();
  }

  const handleOnClick = async () => {
    const config = {
      userName: handleLocalStorage("get", "userName") || "guest-user",
      authToken: handleLocalStorage("get", "auth-token"),
      settings: {
        // initial states
        isAudioMuted: true,
        isVideoMuted: false,
      },
      metaData: JSON.stringify({
        userImage: handleLocalStorage("get", "userImage") || "",
      }),
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    };
    await hmsActions.join(config);
  };

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  if(isConnected){
    return <CallWrapper roomId={roomId} roomName={roomName}></CallWrapper>;
  }else{
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className=" bg-red-600">
          
          You are not connected to the room! Please Join.
        </div>
        <Button
          onClick={() => {
            handleOnClick();
          }}
        >
          Join Again
        </Button>
      </div>
    );
  }
  
};

export default page;
