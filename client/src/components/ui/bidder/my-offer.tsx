import { EditIcon } from "../icons";

interface MyOfferProp {
  text: string;
  value: string;
  onClick: React.MouseEventHandler;
}

function MyOffer({ text, value, onClick }: MyOfferProp) {
  return (
    <div className="px-4 py-3" onClick={onClick}>
      <div className="flex h-14 w-full flex-row items-center rounded-lg border border-penni-grey-border-light-mode bg-gray-100 p-4">
        <span className="body-medium w-full text-penni-text-regular-light-mode">
          {text}: ${value}
        </span>

        <div className="ml-4 size-6">
          <EditIcon strokeColour="penni-text-regular-light-mode" />
        </div>
      </div>
    </div>
  );
}

export default MyOffer;
