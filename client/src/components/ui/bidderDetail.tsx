import Image from "next/image";

interface bidderInfo {
  bidderName: string;
  bidderImg: string;
}

const BidderDetail = (props: bidderInfo) => {
  return (
    <div className="flex items-center gap-2 text-[17px] text-penni-text-regular-light-mode">
      <div className="relative h-12 w-12">
        <Image
          src={props.bidderImg}
          alt="Picture of the bidder"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <p className="font-medium">{props.bidderName}</p>
    </div>
  );
};

export default BidderDetail;
