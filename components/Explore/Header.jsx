import { Button } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <div id="explore-header-mobile" className='text-white text-xl w-[100%] h-[7%] flex justify-between px-4 items-end bg-black font-Poppins font-medium sm:px-10 lg:px-14 sm:text-3xl'>
      <h2 className='text-gray-400 lg:pl-2 '>Explore</h2> 
      <div>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}

export default Header;
