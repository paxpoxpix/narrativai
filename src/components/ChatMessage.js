import React from "react";

const ChatMessage = ({ message, isUser }) => {
  const messageClass = isUser ? "bg-blue-500 text-white" : "bg-gray-200";

  return (
    <div className={`${messageClass} rounded-lg p-4 mb-4`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;