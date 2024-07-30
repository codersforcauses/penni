import React from "react";

import { EditIcon, InfoIcon } from "./icons";

interface CalloutProps {
  text: string | null;
  // If provided, edit icon will be shown
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

interface GenericCalloutProps extends CalloutProps {
  colour: string;
}

function GenericCallout({
  text,
  colour,
  onClick,
  className,
}: GenericCalloutProps) {
  return (
    <div
      className={`${className} ${onClick ? "hover:cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div
        className={`flex h-14 w-full flex-row items-center rounded-penni-border bg-${colour} bg-opacity-5 p-4`}
      >
        <div className="mr-4 size-6">
          <InfoIcon strokeColour={colour} />
        </div>
        <span className={`w-full text-sm font-medium text-${colour}`}>
          {text}
        </span>
        {onClick && (
          <div className="ml-4 size-6">
            <EditIcon strokeColour={colour} />
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCallout({ text, onClick, className }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-text-regular-light-mode"
      onClick={onClick}
      className={className}
    />
  );
}

function SuccessCallout({ text, onClick, className }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-alert-success"
      onClick={onClick}
      className={className}
    />
  );
}

function WarningCallout({ text, onClick, className }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-alert-warning"
      onClick={onClick}
      className={className}
    />
  );
}

function ErrorCallout({ text, onClick, className }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-alert-error"
      onClick={onClick}
      className={className}
    />
  );
}

export { ErrorCallout, InfoCallout, SuccessCallout, WarningCallout };
