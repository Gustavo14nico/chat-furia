import React from 'react';
import '../styles/Message.css'; 

function Message({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      {message.text}
    </div>
  );
}

export default Message;