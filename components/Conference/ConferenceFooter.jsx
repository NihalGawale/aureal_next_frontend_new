import React from "react";
import Footer from "../Footer/Footer";

const ConferenceFooter = ({peersLength,host,room}) => {
  return (
    <div id="footer" className="w-full h-[8%]">
      <Footer peersLength={peersLength} host={host} room={room}></Footer>
    </div>
  );
};

export default ConferenceFooter;
