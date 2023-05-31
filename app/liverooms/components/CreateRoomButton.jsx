import React from 'react';
import GroupsIcon from "@mui/icons-material/Groups";
import { useRoomContext } from '@/contexts/RoomContext';

const CreateRoomButton = () => {
  const {setShowModal} = useRoomContext();
  return (
    <div id="create-room" className="w-full h-[10%]  flex justify-end pr-16">
    <button
      className="flex h-12 w-48 items-center justify-center space-x-3 pl-2 relative text-lg text-white font-bold bg-gradient-to-r from-sky-500 to bg-sky-800 rounded-md"
      onClick={() => setShowModal(true)}
    >
      <GroupsIcon style={{ fontSize: "28px" }} />

      <p>Create Room</p>
    </button>
  </div>
  );
}

export default CreateRoomButton;
