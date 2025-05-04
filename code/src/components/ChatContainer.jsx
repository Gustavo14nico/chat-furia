import React, { useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageWrapper from './MessageWrapper';
import ChatInput from './ChatInput';
import '../styles/ChatContainer.css';

function ChatContainer({ isOpen, onClose, messages, onSendMessage, selectedSuggestion, onSuggestionClick }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chat-container ${isOpen ? "open" : ""}`}>
      <ChatHeader onClose={onClose} />
      <div className="messages-container">
        {messages.map((msg) => (
          <MessageWrapper
            key={msg.id}
            msg={msg}
            selectedSuggestion={selectedSuggestion}
            onSuggestionClick={onSuggestionClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatContainer;