import PersonDetail from "./person-detail";

export interface BidderOfferProps {
  name: string;
  profile: string;
  price: number;
  bio: string;
  className?: string;
  onClick?: () => void;
}

const MAX_BIO_LENGTH = 86;
function truncate(str: string) {
  if (str.length <= MAX_BIO_LENGTH) {
    return str;
  }
  return str.slice(0, MAX_BIO_LENGTH) + "...";
}

export default function BidderOfferCard({
  name,
  profile,
  price,
  bio,
  className,
  onClick,
}: BidderOfferProps) {
  const defaultClassName = "relative m-4 rounded-lg border border-gray-300 p-4";
  return (
    <div className={className ? className : defaultClassName} onClick={onClick}>
      <PersonDetail personName={name} personImg={profile} />
      <div className="absolute right-4 top-6 inline-block font-bold">{`$${price}`}</div>
      <p className="text-sm font-medium">{truncate(bio)}</p>
    </div>
  );
}
