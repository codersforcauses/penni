import { useRouter } from "next/router";
import React from "react";

import Header from "@/components/ui/header";
import { InfoIcon, PhoneIcon } from "@/components/ui/icons";
import ProfileTag from "@/components/ui/profile-tags";

export default function Help() {
  const router = useRouter();
  const role = router.query.role;
  return (
    <div className="flex min-h-screen flex-col bg-penni-background-input-light-mode">
      <Header title="Help centre" />
      <div className="h-0.5 grow-0 bg-penni-background-input-light-mode pt-3"></div>
      <div className="flex flex-col overflow-auto bg-penni-background-light-mode">
        <ProfileTag title="Contact us" description="" />
        <ProfileTag
          title="Report a problem"
          description=""
          link={`/${role}/profile/report`}
        />
      </div>
    </div>
  );
}
