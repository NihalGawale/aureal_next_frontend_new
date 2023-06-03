import React, { useEffect, useState } from "react";
import {
  HMSNotificationTypes,
  useHMSNotifications,
} from "@100mslive/react-sdk";
import { Button, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slide from '@mui/material/Slide';

const Notification = () => {
  const { userData } = useUserContext();
  const [notificationState, setNotificationState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalRemovePeer, setShowModalRemovePeer] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const peerNotification = useHMSNotifications([
    HMSNotificationTypes.PEER_JOINED,
    HMSNotificationTypes.PEER_LEFT,
    HMSNotificationTypes.ROOM_ENDED,
    HMSNotificationTypes.REMOVED_FROM_ROOM,
  ]);

  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }
  

  // console.log(peerNotification,"peer-notification");
  const router = useRouter();

  function handleRoomEnd() {
    setShowModal(false);
    router.push(`/liverooms?user_id=${userData.user_id}`);
  }

  const notify = (msg) => toast(msg);

  useEffect(() => {
    if (!peerNotification) {
      return;
    }
    switch (peerNotification.type) {
      case "PEER_JOINED":
        setOpenSnackBar(true);
        setNotificationState(true);
        break;
      case "PEER_LEFT":
        setNotificationState(true);
        break;
      case "REMOVED_FROM_ROOM":
        setShowModalRemovePeer(true);
        break;
      case "ROOM_ENDED":
        setShowModal(true);
        break;
    }

    if (
      (peerNotification.type == "PEER_JOINED") |
      (peerNotification.type == "PEER_LEFT")
    ) {
      setTimeout(() => {
        setNotificationState(false);
      }, 2000);
    }
  }, [peerNotification]);

  if (notificationState) {
    if (peerNotification.type == "PEER_JOINED") {
      // notify(`${peerNotification.data.name} has joined the room!`);
      // return (
      //   <div>
      //     <ToastContainer />
      //   </div>
      // );

      return (
        <Snackbar
          open={openSnackBar}
          onClose={() => setOpenSnackBar(false)}
          autoHideDuration={2000}
          message={`${peerNotification.data.name} has joined the room!`}
          // TransitionComponent={TransitionRight}
        />
      );
    } 
     if(peerNotification.type == "PEER_LEFT") {
      console.log("peer left");
      return (
        <Snackbar
          open={openSnackBar}
          onClose={() => setOpenSnackBar(false)}
          autoHideDuration={2000}
          message={`${peerNotification.data.name} has left the room!`}
          // TransitionComponent={TransitionRight}
        />
      );
    }
  }
  if (showModal) {
    return (
      <div>
        {showModal ? (
          <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-lg ">
            <div className="border-0 shadow-md rounded-lg relative flex flex-col justify-center items-center  w-80 h-96 outline-none focus:outline-none bg-[#131010]">
              <div className="h-[15%] w-full flex justify-center items-end gap-x-2">
                <div className="pb-1">
                  <Image
                    width={25}
                    height={15}
                    src="/favicon.ico"
                    alt="aureal_logo"
                  />
                </div>
                <div className="text-2xl font-Merriweather text-white">
                  Aureal
                </div>
              </div>
              <div className="text-white font-sans text-center h-[50%] w-full flex justify-center pt-10 px-7">
                <div className="text-lg font-Prompt">
                  Host has ended this room! Click the Link below to route back.
                </div>
              </div>
              <div className="h-[35%] w-full items-center text-center  text-sm">
                <Button
                  className=" mb-2 text-blue-500"
                  onClick={() => handleRoomEnd()}
                >
                  <p>Back to Aureal LiveRooms</p>
                </Button>
                <Button className="text-blue-500">
                  <a href="https://aureal.one/home">Back to Home</a>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  if (showModalRemovePeer) {
    return (
      <div>
        {showModalRemovePeer ? (
          <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-lg ">
            <div className="border-0 shadow-md rounded-lg relative flex flex-col justify-center items-center  w-80 h-96 outline-none focus:outline-none bg-[#131010]  shadow-blue-500/50">
              <div className="h-[15%] w-full flex justify-center items-end gap-x-2">
                <div className="pb-1">
                  <Image
                    width={25}
                    height={15}
                    src="/favicon.ico"
                    alt="aureal_logo"
                  />
                </div>
                <div className="text-2xl font-Merriweather text-white">
                  Aureal
                </div>
              </div>
              <div className="text-white font-sans text-center h-[50%] w-full flex justify-center pt-10 px-7">
                <div className="text-lg font-Prompt">
                  Host has removed you from the Room. Click the Link below to
                  route back.
                </div>
              </div>
              <div className="h-[35%] w-full items-center text-center  text-sm">
                <Button
                  className=" mb-2 text-blue-500"
                  onClick={() => handleRoomEnd()}
                >
                  <p>Back to Aureal LiveRooms</p>
                </Button>
                <Button className="text-blue-500">
                  <a href="https://aureal.one/home">Back to Home</a>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default Notification;
