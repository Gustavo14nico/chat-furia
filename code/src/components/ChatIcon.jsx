import React from 'react';
import '../styles/ChatIcon.css'; 

function ChatIcon({ isOpen, onClick }) {
  return (
    <div className="chat-icon" onClick={onClick}>
      {isOpen ? "✖" : "💬"}
    </div>
  );
}

export default ChatIcon;