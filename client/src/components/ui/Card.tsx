import React, { ReactNode, useEffect, useState } from "react";

interface CardProps {
  isVisible: boolean;
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
const Card: React.FC<CardProps> = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"; // Prevent background scroll when the card is open
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="card-container z-50">
        <div className="card">
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;
