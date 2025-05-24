import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineSend } from "react-icons/md";
import { LoadingCircle } from "../components/Loading";
import selection from "../context/selection";

const Type_send = () => {
  const { selectedUser, setNewMessage } = selection();
  const [loading,setLoading]=useState(false)

  const [sendMessage, setSendMessage] = useState();

  // console.log(selectedUser);

  const handleSend = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", sendMessage);
    // formData.append("role", role);
    // formData.append("password", password);
    setLoading(true)
    if(!sendMessage){
      setLoading(false)

      return 

    }

    if (selectedUser) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/message/send/${
            selectedUser?._id
          }`,
          formData,
          {
            withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        // setSelectedUser(selectedUser)
        setNewMessage(sendMessage);
        setSendMessage("");
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="w-full gap-2 border-x-1 px-8 py- sticky right-0 bottom-0 flex justify-between items-center border-gray-900  h-[6%] bg-gray-800"
    >
      <div className="flex w-full h-full justify-start items-center">
        <input
          type="text"
          name={sendMessage}
          placeholder="Type A Message"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          className="input flex-grow h-[90%] focus-within:outline-none "
        />
      </div>
      <button>
        {!loading ? (
          <MdOutlineSend size={32} />
        ) : (
          <div className="flex justify-center items-center space-x-2">
          <LoadingCircle/>
            {/* <span>Loging In...</span> */}
          </div>
        )}
      </button>
    </form>
  );
};

export default Type_send;
