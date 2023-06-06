import {
  selectLocalPeer,
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectSessionId,
  selectLocalPeerRole,
  selectPermissions,
  selectRoom,
  selectPeersByRole,
} from "@100mslive/react-sdk";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import Notification from "../Notification/Notification";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useEffect, useState } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import "../../styles/global.css";
import { useRoomContext } from "@/contexts/RoomContext";
import Slide from "@mui/material/Slide";
import { useUserContext } from "@/contexts/UserContext";
import {
  Divider,
  Fade,
  IconButton,
  MenuItem,
  Snackbar,
  Tooltip,
  Zoom,
} from "@mui/material";
import Notification from "../Notification/Notification";
import { Route } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function Footer(params) {
  const { room } = params;

  const { handleLocalStorage } = useUserContext();
  const [recordingStatus, setRecordingStatus] = useState(false);
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  const router = useRouter();
  const [time, setTime] = useState();

  const { roomData, description, createRoomCodes } = useRoomContext();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const roomJoined = useHMSStore(selectRoom);
  const open = Boolean(anchorEl);
  const host = useHMSStore(selectPeersByRole("host"))[0];
  const hostData = JSON.parse(host.metadata);
  let roomCode = handleLocalStorage("get", "roomCode");
  let room_id = handleLocalStorage("get", "roomId");

  const handleShareLink = async () => {
    let response = await createRoomCodes(room_id);
    response.data.map((data) => {
      if (data.role == "listener") {
        console.log(data.code, "listener code");
        handleLocalStorage("set", "listenerRoomCode", data.code);
      }
    });
    setOpenSnackBar(true);
    navigator.clipboard.writeText(
      `https://aureal-next-frontend-new.vercel.app/liverooms/meeting/${handleLocalStorage(
        "get",
        "listenerRoomCode"
      )}/${room_id}`
    );
  };

  const endRoom = async () => {
    try {
      const lock = false; // set to true to disallow rejoins
      const reason = "Host ended the room";

      if (handleLocalStorage("get", "roomDataObjectId")) {
        const roomCreated = await axios.post(
          `https://api.aureal.one/public/create100msRoom`,
          {
            data: {
              roomId: roomJoined.id,
              sessionId: roomJoined.sessionId,
              title: roomJoined.name,
              description: description,
              host: hostData.userId,
              createdon: roomJoined.startedAt,
              roomDataObjectId: handleLocalStorage("get", "roomDataObjectId"),
              mg_access_token: handleLocalStorage("get", "mg-access-token"),
            },
          }
        );
      }

      handleLocalStorage("delete", "authToken");
      handleLocalStorage("delete", "roomId");
      handleLocalStorage("delete", "roomName");
      handleLocalStorage("delete", "role");
      handleLocalStorage("delete", "roomCode");
      handleLocalStorage("delete", "role");

      await hmsActions.endRoom(lock, reason);
      router.push(
        `/liverooms?user_id=${
          handleLocalStorage("get", "user_id") || "guest-user"
        }`
      );
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };

  const leaveRoom = async () => {
    await hmsActions.leave();
  };

  //To disable room on dashboard
  const disableRoom = async () => {
    const data = {
      enabled: false,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${handleLocalStorage("get", "mg-access-token")}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `https://api.100ms.live/v2/rooms/${roomData.id}`,
        data,
        config
      );
      handleLocalStorage("delete", "authToken");
      handleLocalStorage("delete", "roomId");
      handleLocalStorage("delete", "roomName");
      handleLocalStorage("delete", "role");
      handleLocalStorage("delete", "roomCode");
      handleLocalStorage("delete", "role");
      return response;
    } catch (err) {
      console.log("Room Create Error: " + err);
    }
  };

  const start = async () => {
    const response = await axios.post(
      `https://api.aureal.one/public/startRecording`,
      {
        roomId: handleLocalStorage("get", "roomId"),
        mg_access_token: handleLocalStorage("get", "mg-access-token"),
      }
    );
  };

  const stop = async () => {
    const response = await axios.post(
      `https://api.aureal.one/public/stopRecording`,
      {
        roomId: handleLocalStorage("get", "roomId"),
        mg_access_token: handleLocalStorage("get", "mg-access-token"),
      }
    );
    const objectId = await response.data.roomDataObjectId;
    handleLocalStorage(
      "set",
      "roomDataObjectId",
      response.data.roomDataObjectId
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRecording = async () => {
    if (recordingStatus == false) {
      await start();
      setRecordingStatus(true);
      handleClose();
    } else {
      await stop();
      setRecordingStatus(false);
      handleClose();
    }
  };
  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

  let date;
  let hours;
  let minutes;
  useEffect(() => {
    const displayTime = () => {
      date = new Date();
      hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
      minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

      let currentTime = hours >= 12 ? "PM" : "AM";
      // Find current hour in AM-PM Format
      if (hours >= 12) hours = hours % 12;
      // To display "0" as "12"
      hours = hours ? hours : 12;
      setTime(`${hours}:${minutes} ${currentTime}`);
    };

    setInterval(displayTime, 1000);
  }, []);

  const options1 = ["Change Name", "Start Rec", "Stop Rec"];
  const options2 = ["Change Name", "aasfdsdaf", "asdferfeve"];
  return (
    <div className="space-x-10 w-full h-full flex">
      <div className="w-1/2 flex">
        <div className="text-white text-lg font-normal flex w-[30%] space-x-3 pl-8">
          <div className=" flex items-center justify-end w-1/2">{time}</div>
          <div className=" flex  items-center justify-end  w-1/2 text-[#ea3535] ">
            {room.recording.browser.running == true ? (
              <Tooltip
                title="This Room is being recorded by Host!"
                placement="top"
                arrow
              >
                <div className="flex  items-center justify-end py-1 px-2 gap-x-[2px] bg-[#1d1b1b] rounded-sm">
                  <RadioButtonCheckedIcon className="text-lg animate-pulse" />
                  <p>Rec</p>
                </div>
              </Tooltip>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          id="notification"
          className="w-[70%]  flex justify-center pl-4 items-center "
        >
          <Notification />
        </div>
      </div>

      <div className="w-1/2  space-x-8 flex flex-row pt-3">
        <div className="w-[45px] h-[45px] bg-[#1d1b1b] rounded-full flex items-center justify-center">
          {/* {handleLocalStorage('get', "userRole") == "host" ? (
            <button onClick={toggleAudio}>
              {isLocalAudioEnabled ? (
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Turn Off Mic"
                  placement="top"
                  arrow
                >
                  <MicIcon />
                </Tooltip>
              ) : (
                <Tooltip title="Turn On Mic" placement="top" arrow>
                  <MicOffIcon className="text-red-600" />
                </Tooltip>
              )}
            </button>
          ) : (
            <button onClick={() => setRequest(true)}>
              <Tooltip
                TransitionComponent={Fade}
                title={request == true ? "Request Sent!" : "Request to Speak!"}
                placement="top"
                arrow
              >
                <MicOffIcon className="text-red-600" />
              </Tooltip>
            </button>
          )} */}

          {isLocalAudioEnabled ? (
            <Tooltip title="Turn Off Mic" placement="top" arrow>
              <button onClick={toggleAudio}>
                <MicIcon className="text-white" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Turn On Mic" placement="top" arrow>
              <button onClick={toggleAudio}>
                <MicOffIcon className="text-red-600" />
              </button>
            </Tooltip>
          )}
        </div>

        <div className="w-[45px] h-[45px] bg-[#1d1b1b] rounded-full  flex items-center justify-center">
          {isLocalVideoEnabled ? (
            <Tooltip title="Turn Off Video" placement="top" arrow>
              <button onClick={toggleVideo}>
                <VideocamIcon className="text-white" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Turn On Video" placement="top" arrow>
              <button onClick={toggleVideo}>
                <VideocamOffIcon className="text-red-600" />
              </button>
            </Tooltip>
          )}
        </div>
        {localPeer && localPeer.roleName != "host" ? (
          <div className="w-[45px] h-[45px] bg-[#1d1b1b] rounded-full flex items-center justify-center">
            <Tooltip title="Leave Room" placement="top" arrow>
              <button
                onClick={() => {
                  leaveRoom();
                }}
              >
                <ExitToAppIcon className="text-red-600" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <>
            <div className="w-[45px] h-[45px] bg-[#1d1b1b] rounded-full flex items-center justify-center ">
              <Tooltip title="Leave Room" placement="top" arrow>
                <button
                  onClick={() => {
                    leaveRoom();
                  }}
                >
                  <ExitToAppIcon className="text-red-600" />
                </button>
              </Tooltip>
            </div>
            <div className="w-[45px] h-[45px] bg-[#1d1b1b] rounded-full flex items-center justify-center ">
              <Tooltip title="End Room" placement="top" arrow>
                <button
                  onClick={() => {
                    endRoom();
                    disableRoom();
                  }}
                >
                  <CallEndIcon className="text-red-600" />
                </button>
              </Tooltip>
            </div>
          </>
        )}
        <div className="w-[45px] h-[45px] bg-[#1d1b1b] rounded-full flex items-center justify-center ">
          <Tooltip title="More" placement="top" arrow>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon className="text-white" />
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: "#363636",
                color: "#c4c0c0",
              },
            }}
          >
            {handleLocalStorage("get", "userRole") == "host" ? (
              <div>
                {/* <MenuItem onClick={handleClose}>Change Name</MenuItem> */}
                {recordingStatus ? (
                  <MenuItem onClick={handleRecording}>Stop Recording</MenuItem>
                ) : (
                  <MenuItem onClick={handleRecording}>Start Recording</MenuItem>
                )}

                <MenuItem onClick={handleShareLink}>Share Room Link!</MenuItem>
                <Snackbar
                  open={openSnackBar}
                  onClose={() => setOpenSnackBar(false)}
                  autoHideDuration={2000}
                  message="Link Copied to clipboard"
                  TransitionComponent={TransitionRight}
                />
              </div>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Footer;
