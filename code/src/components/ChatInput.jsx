import React, { useState } from 'react';
import '../styles/ChatInput.css';

function ChatInput({ onSendMessage }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleSendButtonClick = () => {
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendButtonClick}>Enviar</button>
    </div>
  );
}

export default ChatInput;