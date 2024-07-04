import Image from "next/image";
import Link from "next/link";

interface personInfo {
  personName: string;
  personImg: string;
  link?: string;
}

const PersonDetail = (props: personInfo) => {
  return (
    <Link href={props.link || ""}>
      <div className="flex items-center gap-2 text-base text-penni-text-regular-light-mode">
        <div className="relative h-12 w-12">
          <Image
            src={props.personImg}
            alt="Picture of the person"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="font-medium">{props.personName}</p>
      </div>
    </Link>
  );
};

export default PersonDetail;
