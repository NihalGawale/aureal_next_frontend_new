"use client"
import React from 'react';
import Peer from '../Tile/Peer';

const ConferenceComponent = ({peers,host}) => {
  return (
    <div
    id="conference-component"
    className={`w-full h-[80%] border-b border-gray-600  p-5`}
  >
    <div
      id="grid-wrapper"
      className={
        `grid gap-4 w-[100%] h-[100%] ` +
       (peers.length === 1
            ? "grid-cols-1 px-10 "
            : peers.length > 1 && peers.length <= 2
            ? "grid-cols-2"
            : peers.length > 2 && peers.length <= 4
            ? "grid-cols-2 grid-rows-2"
            : peers.length > 4 && peers.length <= 6
            ? "grid-cols-3 grid-rows-2 "
            : peers.length > 6 && peers.length <= 9
            ? "grid-cols-3 grid-rows-3 gap-3"
            : peers.length > 9 && peers.length <= 12
            ? "grid-cols-4 grid-rows-3"
            : peers.length > 12 && peers.length <= 16
            ? "grid-cols-4 grid-rows-4"
            : peers.length > 16 && peers.length <= 20
            ? "grid-cols-5 grid-rows-4"
            : "")
      }
    >
      {host && host.roleName === "host" ? (
        <Peer key={host.id} peer={host} />
      ) : null}
      {peers.length > 0 &&
        peers.map((peer) =>
          peer.roleName === "listener" ? (
            <Peer key={peer.id} peer={peer} />                                    
          ) : null
        )}
    </div>
  </div>
  );
}

export default ConferenceComponent;
