"use client";

import axios from "axios";
import { useUserContext } from "./UserContext";
import { useRouter } from "next/navigation";
const { createContext, useContext, useState } = require("react");

const RoomContext = createContext();

export const useRoomContext = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }) => {
  const { mgAccessToken, setUserRole, handleLocalStorage } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState();
  const router = useRouter();

  const listAllRooms = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${mgAccessToken}`,
      },
      next: { revalidate: 10 },
    };

    console.log(config, "config");
    const response = await axios.get("https://api.100ms.live/v2/rooms", config);
    return response.data.data;
  };

  const createRoom = async () => {
    const data = {
      name: roomName,
      description: description,
      template_id: "6423ed2dc719ba667aeab791",
      enabled: true,
    };
    console.log(data);

    console.log(mgAccessToken, "create room config");
    const config = {
      headers: {
        Authorization: `Bearer ${mgAccessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "https://api.100ms.live/v2/rooms",
        data,
        config
      );
      console.log(response.data, "Create Room Resp");
      setRoomData(response.data);
      handleLocalStorage("set", "roomId", response.data.id);
      handleLocalStorage("set", "roomName", response.data.name);
      setUserRole("host");
      handleLocalStorage("set", "userRole", "host");
      setRoomId(response.data.id);
      router.push(`/liverooms/preview`);
    } catch (error) {
      console.log("Error creating Room");
    }
  };

  const getSpecificRoomData = async (room_id) => {
    let roomId;
    if (room_id) {
      roomId = room_id;
    } else {
      roomId = handleLocalStorage("get", "roomId");
    }
    let mgAccessToken = handleLocalStorage("get", "mg-access-token");
    const response = await axios.post(
      "https://api.aureal.one/public/getRoomDataHMS",
      { roomId: roomId, mg_access_token: mgAccessToken }
    );
    console.log(response.data, "Active Room Data in Conference");
    return Promise.resolve(response.data)
  };

  return (
    <RoomContext.Provider
      value={{
        showModal,
        roomName,
        roomId,
        roomData,
        description,
        setRoomName,
        setDescription,
        setShowModal,
        listAllRooms,
        createRoom,
        getSpecificRoomData
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
