import { usePeerContext } from "@/contexts/PeerContext";
import {
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  selectVideoTrackByID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import React from "react";

const PreviewTile = () => {
  const { localPeer } = usePeerContext();
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

  const { videoRef } = useVideo({
    trackId: localPeer.videoTrack,
  });

  return (
    <div className="w-full h-full">
      {isVideoOn ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover -scale-x-100"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PreviewTile;
