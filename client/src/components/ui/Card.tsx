import React, { ReactNode, useEffect, useState } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isButtonActive = inputValue.trim() !== "";

  return (
    isVisible && (
      <div className="card-container">
        <div className="card">
          <button className="close-button" onClick={handleClose}>
            ✖
          </button>
          <div className="input-container">
            <span>$</span>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
          <button
            className={`confirm-button ${isButtonActive ? "active" : ""}`}
            disabled={!isButtonActive}
          >
            Confirm
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Card;
