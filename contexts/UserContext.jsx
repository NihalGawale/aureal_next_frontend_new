"use client";
import axios from "axios";
import jwt_decode from "jwt-decode";

const { createContext, useContext, useState } = require("react");
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState(); // For Guest Users to input name at preview page.
  const [userRole, setUserRole] = useState("");
  const [mgAccessToken, setMgAccessToken] = useState();
  const [authToken, setAuthToken] = useState();

  const triggerFetchUserData = async () => {
    const user_id = localStorage.getItem("user_id");
    const response = await axios.post(
      "https://api.aureal.one/public/loginTemp",
      {
        user_id: user_id,
      }
    );
    setUserData(response?.data?.prev_user || {});
    let userData = response.data.prev_user;
    handleLocalStorage("set", "userName", userData.hive_username);
    handleLocalStorage("set", "userImage", userData.img);
    console.log("this line executed");
  };

  const checkAndGetToken = (param, roomId, role) => {
    if (param === "mg-access-token") {
      console.log("You are here");

      const localMgAccessToken = handleLocalStorage("get", "mg-access-token");
      if (checkToken(localMgAccessToken)) {
        console.log("check token func return true");
        fetchMgAccessToken().then((response) => {
          console.log(response, "fetchMgAccessToken called");
          setMgAccessToken(response);
        });
      } else {
        console.log("check token func return false");
        setMgAccessToken(localMgAccessToken);
      }
    }
    if (param === "auth-token") {
      const localAuthToken = handleLocalStorage("get", "auth-token");
      if (checkToken(localAuthToken)) {
        console.log("check token func return true for auth token");
        fetchHmsAuthToken(roomId, role).then((response) => {
          console.log(response, "fetchHmsAuthToken called");

          return response;
        });
      } else {
        console.log("check token func return false for auth token");
        setAuthToken(localAuthToken);
        return localAuthToken;
      }
    }
  };

  const checkToken = (token) => {
    console.log(token, "check-token");
    if (token == null || undefined || "") {
      return true;
    }
    let expiry = jwt_decode(token).exp;
    let expDateTime = new Date();
    expDateTime.setTime(expiry * 1000);
    let currentDateTime = new Date();

    if (currentDateTime.getTime() > expDateTime.getTime()) {
      return true; //Expired
    } else {
      return false;
    }
  };

  const fetchMgAccessToken = async () => {
    const response = await axios.post(
      `https://api.aureal.one/public/getHMSToken?user_id=` + userData.id
    );
    console.log(response.data, "mg-access-token");
    handleLocalStorage("set", "mg-access-token", response.data);
    return Promise.resolve(response.data);
  };

  const fetchHmsAuthToken = async (roomId, role) => {
    const response = await axios.post(
      "https://api.aureal.one/public/getHMSAuthToken",
      {
        room_id: roomId,
        user_id: userData.id || "1234",
        role: role || "listener",
      }
    );
    console.log(response.data, "auth-token");
    handleLocalStorage("set", "auth-token", response.data);
    setAuthToken(response.data);
    return Promise.resolve(response.data);
  };

  const deleteDataOnLeave = () => {
    handleLocalStorage("delete", "auth-token");
    handleLocalStorage("delete", "roomId");
    handleLocalStorage("delete", "roomName");
  };

  const handleLocalStorage = (requestType, key, value) => {
    if (typeof window !== "undefined") {
      if (requestType === "get") {
        return localStorage.getItem(key);
      }
      if (requestType === "set") {
        localStorage.setItem(key, value);
      }
      if (requestType === "delete") {
        localStorage.removeItem(key);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        userName,
        userRole,
        mgAccessToken,
        authToken,
        setUserName,
        setUserData,
        triggerFetchUserData,
        fetchHmsAuthToken,
        fetchMgAccessToken,
        checkAndGetToken,
        setUserRole,
        deleteDataOnLeave,
        handleLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
