import { useUserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import React from 'react';
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
const PreviewUserCard = () => {
    const {userData,handleLocalStorage} = useUserContext();

  return (
    <div id="previewUserCard" className="  relative  h-[100px] w-[100px] rounded-full justify-center items-center">
    {userData.img ||  handleLocalStorage("get","userImage") ? (
      <Image
        src={userData.img ? userData.img : handleLocalStorage("get","userImage")}
       fill={true}
        alt="user-image"
        className="rounded-full object-cover"
      />
    ) : (
      <PersonIcon
        className="text-3xl text-[#d9cdcd]"
        style={{ fontSize: "100px" }}
      />
    )}
  </div>
  );
}

export default PreviewUserCard;
