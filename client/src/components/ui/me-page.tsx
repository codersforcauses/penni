//this page is the personla page payout

import { ReactNode } from "react";

import BottomNav from "./bottom-nav";

const MeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <BottomNav navIndex={1} />
    </>
  );
};

export default MeLayout;
