import React from 'react';

import { EditIcon, Inbox, Info, Logout, Settings } from "../components/ui/icons"; // Adjust the import path as necessary
import PersonDetail from '../components/ui/person-detail'; // Adjust the import path as necessary
import ProfileTag from '../components/ui/profile_page_tags'; // Adjust the import path as necessary

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <PersonDetail
        personName="Jane Doe"
        personImg="/penni-logo.svg" // Path to the image in the public directory
        link="https://example.com"
      />
      <ProfileTag
        icon={EditIcon} // Pass the component directly
        title="Edit Profile"
        description="Update your personal information"
        link="https://example.com"
      />
      <ProfileTag
        icon={Inbox} // Pass the component directly
        title="Payouts"
        description="To receive your funds"
        link="https://example.com"
      />
      <ProfileTag
        icon={Settings} // Pass the component directly
        title="Account Settings"
        description="Lorem ipsum dolor sit amet."
        link="https://example.com"
      />
      <ProfileTag
        icon={Info} // Use a function component for img
        title="About"
        description="Lorem ipsum dolor sit amet."
        nestedContent={<div>About content goes here</div>}
      />
      <ProfileTag
        icon={Logout} // Use a function component for img
        title="Logout"
        description=""
        nestedContent={<div>Logout content goes here</div>}
      />
    </div>
  );
};

export default ProfilePage;
