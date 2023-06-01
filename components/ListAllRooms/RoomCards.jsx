import {
  selectPeerCount,
  useHMSStore,
  useParticipantList,
} from "@100mslive/react-sdk";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import axios from "axios";

const RoomCards = ({ room }) => {
  const { participants } = useParticipantList();

  const count = useHMSStore(selectPeerCount);

  return (
    <div className="h-60 w-96 relative bg-[#843de8] flex flex-col  text-white mx-2 rounded-md hover:cursor-pointer  hover:scale-105 transform  transition duration-500">
      <div className="flex items-center justify-end pr-4 w-full h-[15%] flex-row space-x-1 animate-pulse">
        <div className="pb-[5px]">
          <FiberManualRecordIcon style={{ fontSize: "9px" }} className=""/>
        </div>
        <div className="text-sm font-Prompt font-medium">Live</div>
      </div>

      <div className="h-[85%] flex flex-col text-white font-Poppins ">
        <div className="max-h-[35%]  text-[22px] font-semibold px-3 break-words  overflow-hidden text-ellipsis ">
          {room.name}
        </div>
        <div className="flex flex-row space-x-1 pr-3 pt-3 justiy-start max-h-[45%] ">
          <div className="text-sm font-medium px-3">{room.description}</div>
        </div>
        {/* <div className="flex flex-row space-x-3 pr-3 items-center justiy-start absolute bottom-10 pl-3  text-xs h-[10%] ">
          <div className="p-1 backdrop-opacity-10  bg-white/30 rounded-[3px]">
            {" "}
            Host{" "}
          </div>
          <div> Host Name </div>
        </div>
        <div className="flex flex-row space-x-3 px-4 pb-3 items-center justiy-start absolute bottom-0 text-xs h-[10%] ">
       
          <p>In Room Members</p>
        </div> */}
      </div>
    </div>
  );
};

export default RoomCards;
