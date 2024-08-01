import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

import useFetchData from "@/hooks/use-fetch-data";

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

const PosterProfilePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token) as { user_id: string };
      setUserId(decoded.user_id);
    } else {
      console.error("No token found");
    }
  }, []);

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetchData(userId ? `/app/users/${userId}/` : null, Boolean(userId));
  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError}</div>;

  // img src needs to change to user.avatar_url later
  return (
    <div className="m-0">
      <div className="mt-20 flex flex-col items-center">
        <PersonImg personImg="" size={120} />
        <p className="mt-4 text-t3 font-semibold text-penni-text-regular-light-mode">
          {user.username}
        </p>
        <p className="text-sh font-normal text-penni-text-secondary-light-mode">
          {user.email}
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
          link="/poster/profile/help"
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

export default PosterProfilePage;
