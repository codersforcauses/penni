import React from "react";

import BottomNav from "@/components/ui/bidder/bottom-nav";

import {
  AboutInfoIcon,
  EditIcon,
  InboxIcon,
  LogoutIcon,
  SettingsIcon,
} from "../../../components/ui/icons";
import { PersonImg } from "../../../components/ui/person-detail";
import ProfileTag from "../../../components/ui/profile-tags";

const ProfilePage: React.FC = () => {
  return (
    <BottomNav>
      <div className="mt-20 flex flex-col items-center">
        <PersonImg personImg="/penni-logo.svg" size={120} />
        <p className="mt-4 text-t3 font-semibold text-penni-text-regular-light-mode">
          Jane Doe
        </p>
        <p className="text-sh font-normal text-penni-text-secondary-light-mode">
          emailaddress@gmail.com.au
        </p>
      </div>
      <div className="mt-6">
        <ProfileTag
          icon={EditIcon}
          title="Edit Profile"
          description="Update your personal information"
          link=""
        />
        <ProfileTag
          icon={InboxIcon}
          title="Payouts"
          description="To receive your funds"
          link="/bidder/profile/payouts"
        />
        <ProfileTag
          icon={SettingsIcon}
          title="Account Settings"
          description="Lorem ipsum dolor sit amet."
          link=""
        />
        <ProfileTag
          icon={AboutInfoIcon}
          title="About"
          description="Lorem ipsum dolor sit amet."
          link=""
        />
        <ProfileTag
          icon={LogoutIcon}
          title="Logout"
          description=""
          nestedContent={<div>Logout content goes here</div>}
        />
      </div>
    </BottomNav>
  );
};

export default ProfilePage;
