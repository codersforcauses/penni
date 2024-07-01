/*
warning
alert
success
default/info

color, icon

callout:
    width: 343px, 
    height: 56px,
    radius=8px
    padding=16px
    gap??? = 15px

text:
    weight: 500
    size: 15px
    lineheight: 20px
    font: SF Pro Text

*/

function InfoIcon({ strokeColour }: { strokeColour: string }) {
  return (
    <svg
      className={`size-6 fill-none stroke-${strokeColour}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GenericCallout({ text, colour }: { text: string; colour: string }) {
  return (
    <div className="px-4 py-3">
      <div
        className={`flex h-14 w-full flex-row items-center rounded-penni-border bg-${colour} bg-opacity-5 p-4`}
      >
        <div className="mr-4 size-6">
          <InfoIcon strokeColour={colour} />
        </div>
        <span className={`text-sm font-medium text-${colour}`}>{text}</span>
      </div>
    </div>
  );
}

export function InfoCallout({ text }: { text: string }) {
  return <GenericCallout text={text} colour="penni-text-regular-light-mode" />;
}

export function SuccessCallout({ text }: { text: string }) {
  return <GenericCallout text={text} colour="penni-alert-success" />;
}

export function WarningCallout({ text }: { text: string }) {
  return <GenericCallout text={text} colour="penni-alert-warning" />;
}

export function ErrorCallout({ text }: { text: string }) {
  return <GenericCallout text={text} colour="penni-alert-error" />;
}
