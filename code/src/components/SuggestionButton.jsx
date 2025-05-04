import React from 'react';
import '../styles/SuggestionButton.css'; 

function SuggestionButton({ suggestion, isSelected, onClick }) {
  return (
    <button
      className={`suggestion-button ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {suggestion}
    </button>
  );
}

export default SuggestionButton;