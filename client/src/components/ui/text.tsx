import React from "react";

interface HeadingProps {
  text: string;
}

interface SubheadingProps {
  text: string;
  children?: React.ReactNode;
}

interface ParagraphProps {
  text: string | null | undefined;
}

export const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <div className="body-medium py-2.5 text-penni-text-regular-light-mode">
      {text}
    </div>
  );
};

export const Subheading: React.FC<SubheadingProps> = ({ text, children }) => {
  return (
    <div className="footnote py-2.5 text-penni-text-secondary-light-mode">
      {text}
      {children}
    </div>
  );
};

export const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  return (
    <div className="body py-1.5 text-penni-text-regular-light-mode">{text}</div>
  );
};
