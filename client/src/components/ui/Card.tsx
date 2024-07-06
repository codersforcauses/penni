import React, { ReactNode, useEffect, useState } from "react";

interface CardProps {
  onClose: () => void;
  children: ReactNode;
}

/**
 * The popup card component.
 *
 * @param onClose - The function called when the component is closed.
 * @param children - (OPTIONAL) The children inside the popup.
 * @returns The card component.
 *
 * @example
 * <Card onClose={handleCardClose}> </Card>
 */
const Card: React.FC<CardProps> = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div className="card-container">
        <div className="card">
          <button className="close-button" onClick={handleClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Card;
