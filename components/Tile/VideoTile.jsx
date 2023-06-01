import { useVideo } from '@100mslive/react-sdk';
import React from 'react';

const VideoTile = ({peer}) => {

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div id="video-wrapper" className='w-[100%] h-[100%] overflow-hidden'>
    <video
    ref={videoRef}
   className=' w-[100%] h-[100%]  object-cover -scale-x-100'
    autoPlay
    muted
    playsInline
  />
  </div>

  );
}

export default VideoTile;
