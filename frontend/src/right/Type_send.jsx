import axios from "axios";
import React from "react";
import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import selection from "../context/selection";

const Type_send =  () => {
  const { selectedUser ,setNewMessage} = selection();

  const [sendMessage,setSendMessage]=useState(); 

  // console.log(selectedUser);

  const handleSend = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", sendMessage);
    // formData.append("role", role);
    // formData.append("password", password);

    if (selectedUser) {
      try {
        const { data } =await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/message/send/${
            selectedUser?._id
          }`,formData,
          {
            withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        // setSelectedUser(selectedUser)
        setNewMessage(sendMessage)
        setSendMessage("")

      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="w-full gap-2 border-x-1 px-8 py- sticky right-0 bottom-0 flex justify-between items-center border-gray-900  h-[8%] bg-gray-800"
    >
      <div className="flex w-full h-full justify-start items-center">
        <input
          type="text"
          name={sendMessage}
          placeholder="Type A Message"
          value={sendMessage}
          onChange={(e)=>setSendMessage(e.target.value)}
          className="input flex-grow h-[90%] focus-within:outline-none "
        />
      </div>
      <button>
        <MdOutlineSend size={32} />
      </button>
    </form>
  );
};

export default Type_send;
