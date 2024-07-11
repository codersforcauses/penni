import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-grow-0 flex-row items-center justify-center bg-penni-background-light-mode px-4 pb-4 pt-6">
      <Button onClick={handleBackClick} variant="link">
        <Image src="/icons/arrow_back.svg" alt="Back" width={24} height={24} />
      </Button>
      <h2 className="body-medium flex-grow text-center">{title}</h2>
    </div>
  );
};

export default Header;
