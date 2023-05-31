import React from "react";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const ChatInput = ({ value, onChange, onKeyPress,onClick }) => {
  return (

    <div className="h-[10%] w-full flex items-center justify-center space-x-2">

      <input
        value={value}
        onChange={onChange}
        rows="2"
        cols="50"
        id="chat-123"

        className="pl-5 py-3 text-white bg-[#393842] focus:bg-black rounded-full border-none focus:ring-1 ring-brand-100 outline-none  w-[78%]  break-words scrollbar-hide"

        placeholder="Write Message..."
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            if (!event.shiftKey) {
              event.preventDefault();
              if (value.trim() !== "") {
                onKeyPress();
              }
            }
          }
        }}
      />
      <div className="flex items-center justify-center p-[10px] rounded-full bg-[#393842] hover:cursor-pointer" onClick={onClick}>
        <SendRoundedIcon />
      </div>

    </div>
  );
};

export default ChatInput;
