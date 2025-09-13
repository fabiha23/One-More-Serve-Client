// ChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { socket } from "../../socket";
import { format, parseISO } from "date-fns";

const ChatModal = ({ isOpen, onClose, roomId, currentUser, chatWith }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  console.log(currentUser)

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Join room and listen for messages
  useEffect(() => {
    if (!isOpen || !roomId) return;

    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", { roomId });
      socket.off("receiveMessage");
    };
  }, [isOpen, roomId]);

  // Handle sending message
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      message: newMessage,
      from: currentUser,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  // Safe time formatting
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      return format(parseISO(timestamp), "HH:mm");
    } catch {
      return "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end items-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-md h-[85%] bg-white rounded-xl shadow-2xl flex flex-col mr-6 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
          <h2 className="font-semibold">{chatWith}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes className="text-base" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, idx) => {
              const isCurrentUser = msg?.from === currentUser;
              const time = formatTime(msg?.timestamp);

              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {isCurrentUser ? "You" : msg?.from}
                  </p>
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] break-words ${
                      isCurrentUser
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-200 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    {msg?.message}
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}>
                    {time}
                  </p>
                </div>
              );
            })}
          </div>
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`px-4 py-2 rounded-lg text-white ${
              newMessage?.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
