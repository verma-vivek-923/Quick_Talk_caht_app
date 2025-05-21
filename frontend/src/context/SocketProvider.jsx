import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";
import { useContext } from "react";

const socketContext = createContext();

export const useSocket= ()=>{
  return useContext(socketContext);
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [onlineUser, setOnlineUser] = useState([]);

  const { profile } = useAuth();

  // console.log(profile);

  useEffect(() => {
    if (profile) {
      const socket = io("http://localhost:4500", {
        query: {
          userId: profile._id,
        },
      });
      console.log(socket);
      setSocket(socket);
      socket.on("all_online_users", (online) => {
        setOnlineUser(online);
      });
      return ()=>socket.close();
    }
else{
  if(socket){
    socket.close();
    setSocket(null);
  }
}


  }, [profile]);
  
  console.log(onlineUser);
  return (
    <socketContext.Provider value={{ socket,onlineUser }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
