import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";

import { DropdownIcon } from "./icons";

interface HeaderProps {
  title: string; // Prop to pass the title of the header
  className?: string; // Optional prop to pass extra classnames to the main div
  hideBackButton?: boolean; // Optional prop to hide the back button
  hideOptionButton?: boolean; // Optional prop to hide the option button
  onClickOption?: () => void;
}

/**
 * Header component that displays a title and optionally a back button. Not used in signup page!!
 *
 * @param {HeaderProps} props - The props for the component.
 * @param {string} props.title - Title of the header.
 * @param {boolean} [props.hideBackButton=false] - Flag to hide the back button. (OPTIONAL) (DEFAULT: False)
 * @param {string} [props.className] - Additional CSS classes to apply to the component. (OPTIONAL)
 * @returns {JSX.Element} The Header component.
 *
 * @example
 * <Header title="Report a problem" />
 */
export default function Header({
  title,
  className,
  hideBackButton = false,
  hideOptionButton = true,
  onClickOption,
}: HeaderProps) {
  const router = useRouter();

  // Sends the user to the last previous page they were on
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      id="header"
      className={`relative flex flex-grow-0 items-center justify-center bg-penni-background-light-mode px-4 pb-3 pt-2 text-penni-text-regular-light-mode ${className}`}
    >
      {!hideBackButton && (
        <Button
          onClick={handleBackClick}
          variant="link"
          className="absolute left-2 rotate-90"
        >
          <DropdownIcon />
        </Button>
      )}
      <h2 className="body-medium">{title}</h2>
      {!hideOptionButton && (
        <div
          className="absolute right-4 cursor-pointer"
          onClick={onClickOption}
        >
          <Image
            src="/icons/more-horizontal.svg"
            alt="More options"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      )}
    </div>
  );
}
