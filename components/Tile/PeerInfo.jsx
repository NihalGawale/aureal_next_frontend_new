import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectPeerAudioByID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import MicIcon from "@mui/icons-material/Mic";
import MicOffTwoToneIcon from "@mui/icons-material/MicOffTwoTone";
import Image from "next/image";
import React, { useEffect } from "react";
import VideoTile from "./VideoTile";
import Avatar from "@mui/material/Avatar";


const PeerInfo = ({ peer }) => {
  let level = useHMSStore(selectPeerAudioByID(peer.id)) || 0;

  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const videoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  // const defaultImage = "/assets/launch_icon.png";

  const peerMetadata = JSON.parse(peer.metadata);


  if (level > 10) {
    level = 10;
    console.log(level,"audio-level");
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  }

  return (
    
      <div
        id={`${peer.customerUserId}`}
        className=" w-[100%] h-[100%] rounded-md overflow-hidden flex  border-[3px] border-transparent justify-center items-center relative "
        style={{
          // boxShadow: `0px 0px ${level || 0 / 1}px #3d5afe`,
           borderColor: `${level >= 10 ? "#3d5afe" : ""} `,
        }}
      >
        <div className=" absolute top-3 right-4 z-20">
          {audioEnabled ? (
            <MicIcon className="text-[#1f4eb4] " />
          ) : (
            <MicOffTwoToneIcon className="text-red-600" />
          )}
        </div>
        {videoEnabled ? (
          <VideoTile peer={peer} />
        ) : (
          <div className="w-[100%] h-[100%]  rounded-md flex items-center justify-center bg-[#161515]">
            {peerMetadata.userImage ? (
              <Image
                src={peerMetadata.userImage}
                alt="userImage"
                width={60}
                height={60}
                className="rounded-full"
              />
            ) : (
         
              <Avatar
                {...stringAvatar(`${peer.name}`)}
                className="w-[60px] h-[60px] font-semibold text-2xl"
              />
            )}
          </div>
        )}

        <div className="text-center text-sm font-medium text-white mt-3 absolute bottom-3 left-4 z-20">
          {peer.name}
          {peer.roleName === "host"
            ? "( Host )"
            : peer.isLocal
            ? "( You )"
            : `( ${peer.roleName} )`}
        </div>
      </div>
  );
};

export default PeerInfo;
