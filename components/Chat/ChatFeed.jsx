import React from 'react';

const ChatFeed = ({ children }) => {
  return (
    <div
      id='chat-feed'
      className='w-full h-[90%]  px-6 pt-5 flex flex-col overflow-y-auto scrollbar-hide overflow-x-hidden gap-y-5 '
      style={{ height: 'calc(90vh - 100px)' }}
    >
      {children}
    </div>
  );
};

export default ChatFeed;