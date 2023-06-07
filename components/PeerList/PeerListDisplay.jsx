import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import {
  selectIsPeerAudioEnabled,
  selectLocalPeer,
  selectLocalPeerRole,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";

const PeerListDisplay = ({ peer }) => {
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  // const localPeerRole = useHMSStore(selectLocalPeerRole);

  const peerMetadata = JSON.parse(peer.metadata);

  const handleMute = () => {
    hmsActions.setRemoteTrackEnabled(peer.audioTrack, false);
  };

  const handleRemoveRemotePeer = async () => {
    try {
      const reason = "Good Bye";
      await hmsActions.removePeer(peer.id, reason);
    } catch (error) {
      // Permission denied or invalid peer ID or not connected to room
      console.error(error);
    }
  };

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
        width: "100%",
        height: "100%",
        fontSize: "14px",
      },
      children: `${name[0]}`,
    };
  }

  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const btnClass = "flex w-24 text-sm font-semibold hover:bg-gray-500 p-2";
  return (
    <div className="flex w-[100%]  h-12 justify-between items-center text-sm pl-3 pr-7">
      <div className="flex space-x-2 justify-center items-center font-semibold">
        <div className="w-6 h-6">
          {peerMetadata.userImage ? (
            <Image
              src={peerMetadata.userImage}
              alt="userImage"
              width={0}
              height={0}
              className="w-[100%] h-[100%] rounded-full"
            />
          ) : (
            // <div  className="w-[100%] h-[100%] font-semibold text-sm">
            <Avatar {...stringAvatar(`${peer.name}`)} />
            // </div>
          )}
        </div>
        <div className="flex gap-x-1 text-white">
          <div>{peer.name}</div>
          <div>{`(${peer.roleName})`}</div>
        </div>
      </div>
      <div className="flex">
        <div>
          {audioEnabled ? (
            <MicIcon className="text-[#1f4eb4] text-xl" />
          ) : (
            <MicOffIcon className="text-red-600 text-xl" />
          )}
        </div>
        <div>
          {localPeer && localPeer.roleName == "host" && (
            <div className={" menu-btn "}>
              <div as="button" className=" rounded-md px-1 relative group">
                <MoreVertIcon className="text-xl text-white" />
              </div>
              <div className="menu-items py-2 flex-col bg-black text-[#4e4c4c] rounded-md right-3">
                <button className={btnClass} onClick={() => handleMute()}>
                  Mute
                </button>
                <button
                  className={btnClass}
                  onClick={() => handleRemoveRemotePeer()}
                >
                  RemoveUser
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeerListDisplay;
