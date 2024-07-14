import Image from "next/image";
import { useState } from "react";

interface personInfo {
  personName: string;
  personImg?: string;
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

function PersonImg(props: personPic) {
  return (
    <div className="flex justify-center">
      <div
        className="relative"
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
      >
        <Image
          src={props.personImg}
          alt="Picture of the person"
          layout="fill"
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
}

/**
 * personImg component for the circle shape personImg for different size.
 *
 * @param props - The properties for the PersonImg component.
 * @param props.personName - personName: string.
 * @param props.personImg - personImg address: string. (OPTIONAL)

 * @returns circle shape personImg
 *
 * @example
 * // Example usage:
 * <PersonDetail personName="abc" personImg="/penni-logo.svg" />
 */

function PersonDetail(props: personInfo) {
  // Set profile image to default if not provided.
  const img: string = props.personImg
    ? props.personImg
    : "/default-profile.svg";
  return (
    <div className="body-medium flex items-center gap-2 text-penni-text-regular-light-mode">
      <PersonImg personImg={img} size={48} />
      <p>{props.personName}</p>
    </div>
  );
}

export default PersonDetail;
export { PersonImg };
