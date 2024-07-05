import React, { ReactNode, useState } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="card-container">
        <div className="card">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Card;
