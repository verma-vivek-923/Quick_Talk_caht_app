import React from "react";
import selection from "../context/selection";
import { useSocket } from "../context/SocketProvider";

const Toppannel = () => {
  const {selectedUser}=selection()
  const {onlineUser}=useSocket();
  // console.log(selectedUser)

  //isOnline logic
  
  const isOnline =  onlineUser.includes(selectedUser?._id);

  return (
    <div className="w-full border-x-1 px-8 py-2 flex justify-between items-center border-gray-900  h-[8%] bg-gray-800">
      <div >
        <div className="flex  justify-start items-center group hover:bg-gray-300/20 transition-all duration-300 rounded-md ">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
              <img src={selectedUser?.image?.url} alt="Profile Image" />
            </div>
          </div>
          <div className="px-4 overflow-hidden flex flex-col  justify-center">
            <h1 className="text-md capitalize font-bold group-hover:tracking-wider transition-all duration-300">
             {selectedUser?.name || "Profile Image"} 
            </h1>
            <h1 className=" text-xs truncate overflow-hidden transition-all duration-300">
             { isOnline ? "Online" : "offline"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toppannel;
