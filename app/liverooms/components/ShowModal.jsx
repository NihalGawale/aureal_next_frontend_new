"use client";

import { useRoomContext } from "@/contexts/RoomContext";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ShowModal = () => {
  const { setShowModal, setRoomName, setDescription ,createRoom} = useRoomContext();
  const handleSetRoomName = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleSetDesc = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const handleSubmit = async () => {
    setShowModal(false);
    createRoom();
  };
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-xl">
        <div className="border-0  relative rounded-md shadow-xl w-full  max-w-lg flex  bg-[#050404] flex-col outline-none focus:outline-none">
          <div className="items-center justify-center">
            <div className="flex items-center justify-between px-5 relative pt-8 rounded-sm">
              <h3 className="text-2xl font-semibold text-gray-400 font-Poppins">
                Create your live room
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-white block">
                  <CloseIcon style={{ fontSize: "20px" }} />
                </span>
              </button>
            </div>
            <div className="relative h-96">
              <form
                id="create-form"
                className="w-full h-full space-y-4 flex flex-col items-center justify-center"
              >
                <h2 className="font-semibold text-gray-400">Create Room</h2>
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-72 text-sm text-gray-200 bg-transparent rounded-lg border-[1px] border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Room Name"
                    onChange={(e) => handleSetRoomName(e)}
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050404] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Room Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    required
                    type="text"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-72 text-sm text-gray-200 bg-transparent rounded-lg border-[1px] border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Description"
                    onChange={(e) => handleSetDesc(e)}
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050404]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Description
                  </label>
                </div>
              </form>
            </div>
            <div className="flex items-center relative justify-end p-6 rounded-b">
              <button
                className="text-gray-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none"
                
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="btn-primary font-medium text-blue-500"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowModal;
