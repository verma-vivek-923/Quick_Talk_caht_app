import React from "react";
import selection from "./context/selection";
import MessagePannel from "./right/MessagePannel";
import Toppannel from "./right/Toppannel";
import Type_send from "./right/Type_send";

const Right = (drawerClass) => {
  const { selectedUser } = selection();

  return (
    <div className={`${drawerClass} flex-grow bg-gray-600`}>
    {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
      {selectedUser ? (
        <div className=" h-[100dvh] relative flex flex-col justify-between ">
          <Toppannel />
          <MessagePannel />
          <Type_send />
        </div>
      ) : (
        
       <div className="w-full h-full flex justify-center items-center">
            <h1  className="text-2xl text-center ">
              Welcome To <br/>
            <span className="text-5xl">Quick<span className="text-accent">Talk</span></span>  
            </h1>
       </div>
      )}
    </div>

  //   <div className={`${drawerClass} `}>
  //   <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  //   {selectedUser ? (
  //     <div className=" h-screen relative flex flex-col justify-between ">
  //       <Toppannel />
  //       <MessagePannel />
  //       <Type_send />
  //     </div>
  //   ) : (
      
  //    <div className="w-full h-full flex justify-center items-center">
  //         <h1  className="text-2xl ">
  //           Welcome To Chat App
  //         </h1>
  //    </div>
  //   )}
  // </div>
  );
};

export default Right;
