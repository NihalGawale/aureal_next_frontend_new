import React from 'react';

const PeerWrapper = ({  children }) => {
  return (
    <div
    id = "peer-wrapper"
      className='w-auto h-auto overflow-hidden flex flex-col justify-center items-center '  
    >
      {children}
    </div>
  );
};

export default PeerWrapper;