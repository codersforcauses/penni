import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useFetchData from "@/hooks/use-fetch-data";
import { axiosInstance } from "@/lib/api";

import {
  AboutInfoIcon,
  EditIcon,
  HelpCircleIcon,
  LogoutIcon,
  PaymentIcon,
  SettingsIcon,
} from "../../../components/ui/icons";
import { PersonImg } from "../../../components/ui/person-detail";
import ProfileTag from "../../../components/ui/profile-tags";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { posterid } = router.query;
  const queryReady = typeof posterid === "string";

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetchData(`/app/profiles/${posterid}/`, queryReady);
  console.log(user);
  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError}</div>;
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const decoded = jwt.decode(token) as { email: string };
  const email = decoded.email;
  // img src needs to change to user.avatar_url later
  return (
    <div className="m-0">
      <div className="mt-20 flex flex-col items-center">
        <PersonImg personImg="" size={120} />
        <p className="mt-4 text-t3 font-semibold text-penni-text-regular-light-mode">
          {user.full_name}
        </p>
        <p className="text-sh font-normal text-penni-text-secondary-light-mode">
          {email}
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
          icon={PaymentIcon}
          title="Payments"
          description="To make payments"
          link=""
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
          icon={HelpCircleIcon}
          title="Help Centre"
          description="Lorem ipsum dolor sit amet."
          link=""
        />

        <ProfileTag
          icon={LogoutIcon}
          title="Logout"
          description=""
          nestedContent=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;
