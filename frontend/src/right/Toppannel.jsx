import React from "react";
import selection from "../context/selection";
import { useSocket } from "../context/SocketProvider";

const Toppannel = () => {
  const { selectedUser } = selection();
  const { onlineUser } = useSocket();
  // console.log(selectedUser)

  //isOnline logic

  const isOnline = onlineUser.includes(selectedUser?._id);

  return (
    <>
      <div className="w-full border-x-1 sticky top-0 left-0 px-8 py-2 flex justify-between items-center border-gray-900  h-[8%] bg-gray-800">
        <div>
          <div
            tabIndex={0}
            className="flex dropdown  dropdown-bottom md:dropdown-right  justify-start items-center group hover:bg-gray-300/20 transition-all duration-300 rounded-md "
          >
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                <img src={selectedUser?.image?.url} alt="Profile Image" />
              </div>
            </div>
            <div
              tabIndex={0}
              className="px-4 overflow-hidden flex flex-col  justify-center"
            >
              <h1 className="text-md capitalize font-bold group-hover:tracking-wider transition-all duration-300">
                {selectedUser?.name || "Profile Image"}
              </h1>
              <h1 className=" text-xs truncate overflow-hidden transition-all duration-300">
                {isOnline ? "Online" : "offline"}
              </h1>
            </div>

            <div
              tabIndex={0}
              className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
            >
              {/* <div className="card-body"> */}
                <div className="card-body bg-gray-900 rounded-xl  w-full max-w-md space-y-2 shadow-xl">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-600 h-24 w-24 rounded-full flex items-center justify-center text-4xl text-gray-300">
                      <img src={selectedUser?.image?.url} alt="profile" className="w-full object-cover object-center" />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="flex justify-center items-center">
                    <h2 className="text-lg font-semibold">{selectedUser?.name}</h2>
                  </div>

                  {/* About */}
                  <div className="flex justify-between items-center">
                    <div className="w-full">
                      <p className="text-base text-gray-400">Email :</p>

                      <p className="text-sm" >{selectedUser?.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex justify-between items-center">
                    <div className="w-full">
                      <p className="text-base text-gray-400">Phone number :</p>
                        <p className="sm">{selectedUser?.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}

      {/* <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Click
        </div>
        <div
          tabIndex={0}
          className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
        >
          <div className="card-body">
            <p>This is a card. You can use any element as a dropdown.</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Toppannel;
