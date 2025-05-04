import React from 'react';
import Message from './Message';
import SuggestionButton from './SuggestionButton';
import '../styles/MessageWrapper.css';

function MessageWrapper({ msg, selectedSuggestion, onSuggestionClick }) {
  return (
    <div className="message-wrapper">
      <Message message={msg} />
      {msg.suggestions && (
        <div className="suggestions">
          {msg.suggestions.map((sug, index) => (
            <SuggestionButton
              key={index}
              suggestion={sug}
              isSelected={selectedSuggestion === sug}
              onClick={() => onSuggestionClick(sug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageWrapper;