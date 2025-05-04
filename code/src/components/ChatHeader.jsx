import React from 'react';
import '../styles/ChatHeader.css';

function ChatHeader({ onClose }) {
  return (
    <div className="chat-header">
      <h2>🤖 Bot FURIA</h2>
      <button onClick={onClose}>✖</button>
    </div>
  );
}

export default ChatHeader;