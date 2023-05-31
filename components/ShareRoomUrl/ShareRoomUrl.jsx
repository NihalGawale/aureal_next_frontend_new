import { useRoomContext } from "@/contexts/RoomContext";
import { Button, IconButton, Snackbar, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
import Slide from '@mui/material/Slide';
const ShareRoomUrl = () => {
  const { roomName, roomId } = useRoomContext();
  const [open, setOpen] = useState(false);


  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }
  


  const handleClick = () => {
    setOpen(true);
 navigator.clipboard.writeText(
      `http://localhost:3007/liveRooms/${roomName? roomName : "null"}/${roomId ? roomId : "null"}`
    );
  };

  // return <Button onClick={handleClick}>Share</Button>

  return (
    <>
     <div className="bg-[#383d4e]  rounded-full flex items-center justify-center hover:cursor-pointer">
       <IconButton variant="text" className="rounded-full" onClick={handleClick}> 
       <Tooltip title="Invite link!" placement="left" arrow>
        
       <ShareIcon style={{fontSize:"20px"}} className=" text-blue-600" />
       </Tooltip>
       </IconButton>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
            TransitionComponent={TransitionRight}
          />
   </div>
    </>
  );
};

export default ShareRoomUrl;
