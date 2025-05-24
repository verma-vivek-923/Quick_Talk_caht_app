import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingUser } from "../components/Loading";
import { useAuth } from "../context/AuthProvider";

import selection from "../context/selection";
import SocketProvider, { useSocket } from "../context/SocketProvider";
import Search from "./Search";

const Users = () => {
  const [allUser, setAllUser] = useState();
  const [filteredUser, setFilteredUser] = useState(allUser);
  const { selectedUser, setSelectedUser } = selection();
  const { profile } = useAuth();

  const { socket, onlineUser } = useSocket();
  //   const isSelected = (value) =>{
  //    console.log(selectedUser?._id)
  //    console.log(value._id)

  //  const val= selectedUser?._id===value?._id ? true : false

  //  console.log(val)
  //  return val

  // }

  //Alternative more acurate of above function
  const isSelected = (value) =>
    selectedUser?._id === value?._id ? true : false;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/admins`,
          //sending form data to /signup endpoint
          {
            withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setAllUser(data);
        setFilteredUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  console.log(allUser);
  console.log(filteredUser);
  // console.log(onlineUser?.id);
  const [searchVal, setSearchVal] = useState("vivek");

  // Search Logic
  const handleSearch = (searchResult) => {
    console.log(searchResult);

    if (searchResult && searchResult.length > 0) {
      setFilteredUser(searchResult);
    }
  };
  console.log(filteredUser);
  //online status Logic
  const isOnline = (value) => (onlineUser.includes(value?._id) ? true : false);

  return (
    <div className="h-[85%] py-2 pt-4">
      <Search users={allUser} onSearch={handleSearch} />
      <div className="bg-blue-500 w-full mt-2 px-4 text-gray-900 text-lg">
        <h1>Chats</h1>
      </div>
      <div className="py-4 px-2  h-full overflow-x-scroll ">
        {filteredUser && filteredUser.length > 0 ? (
          filteredUser?.map((element) => {
            if (element._id === profile?._id) {
              return [];
            }
            return (
              <>
                <div
                  onClick={() => {
                    setSelectedUser(element);
                    document.getElementById("my-drawer").checked = false;
                  }}
                  key={element._id}
                  className="p-0 m-0"
                >
                  <div
                    className={`${
                      isSelected(element) ? "bg-gray-300/20" : ""
                    } flex px-2 mb-2  py-2 justify-start items-center group hover:bg-gray-300/20 transition-all duration-300 rounded-md `}
                  >
                    <div
                      className={`avatar ${
                        isOnline(element) ? "avatar-online" : " "
                      }`}
                    >
                      <div className="ring-primary ring-offset-base-100 w-12 flex justify-center items-center rounded-full ring-2 ring-offset-2">
                        <img src={element?.image?.url} />
                      </div>
                    </div>
                    {/* {isSelected(element._id) ?  console.log("first"): ""} */}
                    <div className="px-4 overflow-hidden flex flex-col justify-center">
                      <h1 className="text-lg truncate font-bold group-hover:tracking-wider transition-all duration-300">
                        {element.name}
                      </h1>
                      <h1 className=" text-sm truncate overflow-hidden transition-all duration-300">
                        {isOnline(element) ? "Online " : " Offline "}
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="flex space-y-4 flex-col">
            <LoadingUser />
            <LoadingUser />
            <LoadingUser />
            <LoadingUser />
            <LoadingUser />
            <LoadingUser />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
