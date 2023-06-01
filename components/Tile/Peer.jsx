import React from "react";
import PeerWrapper from "./PeerWrapper";
import PeerInfo from "./PeerInfo";

const Peer = ({ peer }) => {
  return (
 <PeerWrapper>
      <PeerInfo peer={peer} />
      </PeerWrapper>
  );
};
export default Peer;
