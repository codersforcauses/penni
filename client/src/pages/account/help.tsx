import Link from "next/link";
import React from "react";

import Header from "@/components/ui/header";
import { InfoIcon } from "@/components/ui/icons";
import { ProfileTag } from "@/components/ui/profile_page_tags";

const Help = () => {
  return (
    <div className="flex min-h-screen flex-col bg-penni-background-input-light-mode">
      <Header title="Help centre" />
      <div className="h-[0.12rem] grow-0 bg-penni-background-input-light-mode pt-3"></div>
      <div className="flex flex-grow flex-col overflow-auto">
        <Link href="/account/report">
          <ProfileTag icon={InfoIcon} title="Report a problem" description="" />
        </Link>
        <Link href="/account/contact">
          <ProfileTag icon={InfoIcon} title="Contact us" description="" />
        </Link>
      </div>
    </div>
  );
};

export default Help;
