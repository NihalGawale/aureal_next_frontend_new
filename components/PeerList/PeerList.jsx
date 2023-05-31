import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React, { useEffect } from "react";
import PeerListDisplay from "./PeerListDisplay";

const PeerList = () => {
  const peers = useHMSStore(selectPeers);
  const host = peers.find((peer) => peer.roleName === "host");

  useEffect(() => {
    console.log(peers, "-----Peers");
    console.log(host, "----host");
  }, [peers]);

  return (
    <div className="flex flex-col w-[100%] h-[100%]">
      <div className="font-semibold text-lg flex items-center justify-center text-white border-b border-[#11a0ff] h-[7%] ">
        {`Participants (${peers.length})`}
      </div>
      <div className="h-[90%]  w-[100%] pt-5 flex flex-col overflow-y-auto pb-10 scrollbar-hide">
        {host && host.roleName === "host" ? (
          <PeerListDisplay key={host.id} peer={host} />
        ) : null}
        {peers.length > 0 &&
          peers.map((peer) =>
            peer.roleName === "listener" ? (
              <PeerListDisplay key={peer.id} peer={peer} />
            ) : null
          )}
      </div>
    </div>
  );
};

export default PeerList;
