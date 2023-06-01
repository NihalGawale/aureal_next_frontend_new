"use client";
import {
  selectLocalPeer,
  selectPeerAudioByID,
  selectRemotePeers,
  useHMSStore,
} from "@100mslive/react-sdk";
import React, { createContext, useContext, useState } from "react";

const PeerContext = createContext();

export const usePeerContext = () => {
  return useContext(PeerContext);
};

export const PeerProvider = ({ children }) => {
  const localPeer = useHMSStore(selectLocalPeer);
  const remotePeers = useHMSStore(selectRemotePeers);

  const [showPeerList, setShowPeerList] = useState();

  let level = useHMSStore(selectPeerAudioByID(localPeer?.id));

  if (level >= 20) {
    level = 20;
  }
  return (
    <PeerContext.Provider value={{ localPeer, remotePeers, level ,showPeerList,setShowPeerList}}>
      {children}
    </PeerContext.Provider>
  );
};
