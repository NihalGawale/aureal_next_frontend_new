import { useUserContext } from "@/contexts/UserContext";
import React from "react";

const Chat = ({ msg }) => {
  
  // const {userData} = useUserContext();
  const { handleLocalStorage} = useUserContext();
   let  user_id = handleLocalStorage('get', "user_id") || "1234";
   console.log(user_id,msg.senderUserId,"msg");
  let hours = msg.time.getHours();
  let minutes = msg.time.getMinutes();
  const time = () => {
    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
  };

  if (msg.senderUserId == user_id) {
    return (
      <div id="message" className="w-auto h-auto flex items-end justify-end ">
        <div
          id="message-wrapper"
          className="max-w-[280px] h-auto  flex items-end justify-end "
        >
          <div className="text-white font-Prompt font-medium break-words relative bg-[#0a0b16] rounded-2xl rounded-br-none text-left py-3 px-2 ">
            <div className="flex flex-col px-3 py-1 text-white  justify-start gap-y-2  text-sm">
              <div className="flex justify-between space-x-2">
                <div>{msg.senderName}</div>
                <div className="flex font-thin items-center text-[#c2c2c2]">
                  {time()}
                </div>
              </div>
            </div>
            <div className="px-3 text-sm">{msg.message}</div>

          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="message" className="w-auto h-auto flex  justify-start ">
        <div
          id="message-wrapper"
          className="max-w-[280px] h-auto flex  justify-start "
        >
          <div className="text-white font-Prompt font-medium  break-words  bg-[#050505] rounded-2xl rounded-bl-none text-left py-3 px-2">
            <div className="flex flex-col  px-3 py-1 text-white  gap-y-2 text-sm ">
              <div className="flex  space-x-2 justify-between">
                <div>{msg.senderName}</div>
                <div className="flex font-thin text-[#6b6a6a] items-center ">
                  {time()}
                </div>
              </div>
              <div className="">{msg.message}</div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
