import React from "react";

const ChatLayout = ({ children }) => {
  return (


    <div className='flex flex-col w-[100%] h-[100%] relative'>
      {children}
    </div>
  );
};

export default ChatLayout;
