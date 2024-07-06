import { EditIcon, InfoIcon } from "./icons";

interface CalloutProps {
  text: string;
  // If provided, edit icon will be shown
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface GenericCalloutProps extends CalloutProps {
  colour: string;
}

function GenericCallout({ text, colour, onClick }: GenericCalloutProps) {
  return (
    <div className="px-4 py-3" onClick={onClick}>
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

function InfoCallout({ text, onClick }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-text-regular-light-mode"
      onClick={onClick}
    />
  );
}

function SuccessCallout({ text, onClick }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-alert-success"
      onClick={onClick}
    />
  );
}

function WarningCallout({ text, onClick }: CalloutProps) {
  return (
    <GenericCallout
      text={text}
      colour="penni-alert-warning"
      onClick={onClick}
    />
  );
}

function ErrorCallout({ text, onClick }: CalloutProps) {
  return (
    <GenericCallout text={text} colour="penni-alert-error" onClick={onClick} />
  );
}

export { ErrorCallout, InfoCallout, SuccessCallout, WarningCallout };
