import { useAVToggle } from "@100mslive/react-sdk";
import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useUserContext } from "@/contexts/UserContext";
import { Tooltip } from "@mui/material";

const PreviewControls = () => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const { userRole } = useUserContext();
  return (
    <div className="w-full h-full  flex flex-row space-x-5 items-center justify-center">
      <div className="py-[6px] px-[7px] backdrop-blur-md bg-white/20  rounded-full flex items-center justify-center hover:cursor-pointer">
        {/* {userRole == "host" ? (
          <button onClick={toggleAudio}>
            <Tooltip title="Joining as Host!" placement="top" arrow>
            {isLocalAudioEnabled ? (
              <MicIcon style={{ fontSize: "20px" }} />
            ) : (
              <MicOffIcon
                style={{ fontSize: "20px" }}
                className="text-red-500"
              />
            )}
            </Tooltip>
          </button>
        ) : (
          <Tooltip title="Joining as Listener.You can request in room to speak!" placement="top" arrow>
          <MicOffIcon style={{ fontSize: "20px" }} className="text-red-500" />
          </Tooltip>
        )} */}
        {userRole == "host" ? (
          <button onClick={toggleAudio}>
            <Tooltip title="Joining as Host!" placement="top" arrow>
              {isLocalAudioEnabled ? (
                <MicIcon style={{ fontSize: "20px" }} />
              ) : (
                <MicOffIcon
                  style={{ fontSize: "20px" }}
                  className="text-red-500"
                />
              )}
            </Tooltip>
          </button>
        ) : (
          <button onClick={toggleAudio}>
            <Tooltip title="Joining as Listener!" placement="top" arrow>
              {isLocalAudioEnabled ? (
                <MicIcon style={{ fontSize: "20px" }} />
              ) : (
                <MicOffIcon
                  style={{ fontSize: "20px" }}
                  className="text-red-500"
                />
              )}
            </Tooltip>
          </button>
        )}
      </div>

      <div className="py-[6px] px-[7px]  backdrop-blur-md bg-white/20  rounded-full  flex items-center justify-center">
        <button onClick={toggleVideo}>
          {isLocalVideoEnabled ? (
            <VideocamIcon style={{ fontSize: "20px" }} />
          ) : (
            <VideocamOffIcon
              style={{ fontSize: "20px" }}
              className="text-red-500"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default PreviewControls;
