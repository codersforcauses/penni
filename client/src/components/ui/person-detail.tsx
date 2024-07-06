import Image from "next/image";
import Link from "next/link";

interface personInfo {
  personName: string;
  personImg: string;
  link?: string;
}

interface personPic {
  personImg: string;
  size: number;
}

/**
 * personImg component for the circle shape personImg for different size.
 *
 * @param props - The properties for the PersonImg component.
 * @param props.personImg - personImg address: string.
 * @param props.size - Pixel size of the height and width of the image without 'px'. Type: number. 

 * @returns circle shape personImg
 *
 * @example
 * // Example usage:
 * <PersonImg personImg="/penni-logo.svg" size={48} />
 */

const PersonImg = (props: personPic) => {
  // convert px to tailwind style size number
  const size = props.size / 4;
  return (
    <div className="flex justify-center">
      <div className={`relative h-${size} w-${size}`}>
        <Image
          src={props.personImg}
          alt="Picture of the person"
          fill
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

/**
 * personImg component for the circle shape personImg for different size.
 *
 * @param props - The properties for the PersonImg component.
 * @param props.personName - personName: string.
 * @param props.personImg - personImg address: string.
 * @param props.link - link to user detail page: string. **Optional**

 * @returns circle shape personImg
 *
 * @example
 * // Example usage:
 * <PersonDetail personName="abc" personImg="/penni-logo.svg" />
 */

const PersonDetail = (props: personInfo) => {
  return (
    <Link href={props.link || ""}>
      <div className="body-medium flex items-center gap-2 text-penni-text-regular-light-mode">
        <PersonImg personImg={props.personImg} size={48} />
        <p>{props.personName}</p>
      </div>
    </Link>
  );
};

export { PersonDetail, PersonImg };
