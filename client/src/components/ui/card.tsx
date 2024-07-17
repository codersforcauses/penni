import Image from "next/image";
import React, { ReactNode, useEffect } from "react";

interface CardProps {
  isVisible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

/**
 * The popup card component.
 *
 * @param {CardProps} props - The props for the component.
 * @param {boolean} prop.isVisible - The variable used to determine if the component is visible or not.
 * @param {() => void} prop.onClose - The function called when the component is closed.
 * @param {ReactNode} children - The children inside the popup. (OPTIONAL)
 * @returns {JSX.Element} The card component.
 *
 * @example
 * const [isCardVisible, setIsCardVisible] = useState(false);
 * const toggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
   };
 * return ( ...
      <Button onClick={toggleCardVisibility}>Show Card</Button>
      <Card isVisible={isCardVisible} onClose={toggleCardVisibility}>
        <p>Your card content goes here.</p>
      </Card> ...
   );
 */
export default function Card({ isVisible, onClose, children }: CardProps) {
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
      <div className="card-container z-50 p-2">
        <div className="card">
          <button className="close-button" onClick={onClose}>
            <Image
              src="/icons/cross.svg"
              alt="Close"
              width={24}
              height={24}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
