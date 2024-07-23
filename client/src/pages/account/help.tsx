import React from "react";

import Header from "@/components/ui/header";
import { InfoIcon, PhoneIcon } from "@/components/ui/icons";
import ProfileTag from "@/components/ui/profile-tags";

export default function Help() {
  return (
    <div className="flex min-h-screen flex-col bg-penni-background-input-light-mode">
      <Header title="Help centre" />
      <div className="h-[0.12rem] grow-0 bg-penni-background-input-light-mode pt-3"></div>
      <div className="-ml-2 flex flex-grow flex-col overflow-auto">
        <ProfileTag icon={PhoneIcon} title="Contact us" description="" />
        <ProfileTag
          icon={InfoIcon}
          title="Report a problem"
          description=""
          link="/account/report"
        />
      </div>
    </div>
  );
}
