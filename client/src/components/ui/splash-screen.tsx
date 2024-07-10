import Image from "next/image";
import React from "react";

const SplashScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image src="/penni-logo.svg" alt="Penni logo" width={85} height={70} />
    </div>
  );
};

export default SplashScreen;
