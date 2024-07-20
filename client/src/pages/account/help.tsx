import React from "react";

import Header from "@/components/ui/header";
import HelpTag from "@/components/ui/help-tags";
import { InfoIcon, PhoneIcon } from "@/components/ui/icons";

export default function Help() {
  return (
    <div className="flex min-h-screen flex-col bg-penni-background-input-light-mode">
      <Header title="Help centre" />
      <div className="h-[0.12rem] grow-0 bg-penni-background-input-light-mode pt-3"></div>
      <div className="flex flex-grow flex-col overflow-auto">
        <HelpTag icon={PhoneIcon} title="Contact us" description="" />
        <div className="bg-penni-background-light-mode">
          <hr className="mx-5 grow-0 bg-penni-text-regular-dark-mode" />
        </div>
        <HelpTag
          icon={InfoIcon}
          title="Report a problem"
          description=""
          link="/account/report"
        />
      </div>
    </div>
  );
}
