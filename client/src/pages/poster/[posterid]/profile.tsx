import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api";

import {
  EditIcon,
  HelpCircleIcon,
  InfoIcon,
  LogoutIcon,
  PaymentIcon,
  SettingsIcon,
} from "../../../components/ui/icons";
import { PersonImg } from "../../../components/ui/person-detail";
import ProfileTag from "../../../components/ui/profile-tags";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const posterid = router.query.posterid;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/app/profiles/${posterid}/`);
        const jsonResponse = response.data;
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const decoded = jwt.decode(token) as { email: string };
        const user_email = decoded.email;
        jsonResponse["email"] = user_email;
        setProfile(jsonResponse);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-0">
      <div className="mt-20 flex flex-col items-center">
        <PersonImg personImg={profile.avatar_url} size={120} />
        <p className="mt-4 text-t3 font-semibold text-penni-text-regular-light-mode">
          {profile.full_name}
        </p>
        <p className="text-sh font-normal text-penni-text-secondary-light-mode">
          {profile.email}
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
          icon={InfoIcon}
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
