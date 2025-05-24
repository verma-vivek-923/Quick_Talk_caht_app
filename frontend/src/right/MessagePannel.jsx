import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import GetNewMessage from "../context/GetNewMessage";
import selection from "../context/selection";

const MessagePannel = () => {
  const { selectedUser, newMessage } = selection();
  const [chatMessages, setChatMessages] = useState([]);
  const lastMsgRef = useRef(null);

  GetNewMessage();

  const isReceived = (msg) => selectedUser?._id === msg?.sender_id;

  // Fetch messages
  useEffect(() => {
    const getAllChat = async () => {
      if (selectedUser) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/message/get-all/${selectedUser._id}`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setChatMessages(data?.conversion?.messages || []);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getAllChat();
  }, [selectedUser, newMessage]);

  // Auto-scroll to the last message
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="w-full h-[80%] overflow-y-auto px-6 py-4 flex flex-col">
      {chatMessages.map((msg, index) => {
        const isLast = index === chatMessages.length - 1;
        return (
          <div key={msg._id} ref={isLast ? lastMsgRef : null}>
            {isReceived(msg) ? (
              <div className="chat chat-start">
                <div className="chat-bubble">{msg.message}</div>
                {/* <div className="chat-footer opacity-100">Seen</div> */}
              </div>
            ) : (
              <div className="chat chat-end">
                <div className="chat-bubble bg-green-900">{msg.message}</div>
                {/* <div className="chat-footer opacity-100">Delivered</div> */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessagePannel;
