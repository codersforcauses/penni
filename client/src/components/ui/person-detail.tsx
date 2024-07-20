import Image from "next/image";

interface personInfo {
  personName: string;
  personImg: string;
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
          className="rounded-full object-cover"
          fill
          sizes="100vw"
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
 * @param props.personImg - personImg address: string.

 * @returns circle shape personImg
 *
 * @example
 * // Example usage:
 * <PersonDetail personName="abc" personImg="/penni-logo.svg" />
 */

function PersonDetail(props: personInfo) {
  return (
    <div className="body-medium flex items-center gap-2 text-penni-text-regular-light-mode">
      <PersonImg personImg={props.personImg} size={48} />
      <p>{props.personName}</p>
    </div>
  );
}

export default PersonDetail;
export { PersonImg };
