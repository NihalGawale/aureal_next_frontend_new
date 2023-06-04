import React from 'react';
import GroupsIcon from "@mui/icons-material/Groups";
import { useRoomContext } from '@/contexts/RoomContext';

const CreateRoomButton = () => {
  const {setShowModal} = useRoomContext();
  return (
    <div id="create-room" className="w-full h-[10%]  flex justify-end pr-16">
    <button
      className="flex h-12 w-48 items-center justify-center space-x-3 pl-2 relative text-lg text-white font-bold bg-[#6811ff] rounded-md"
      onClick={() => setShowModal(true)}
    >
      <GroupsIcon style={{ fontSize: "28px" }} />

      <p className='font-medium'>Create Room</p>
    </button>
  </div>
  );
}

export default CreateRoomButton;
