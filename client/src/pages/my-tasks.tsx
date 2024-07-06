import type { ReactElement } from "react";

import MeLayout from "@/components/ui/MeLayout";

import type { NextPageWithLayout } from "./_app";

const MarketPage: NextPageWithLayout = () => {
  return <p>TODO</p>;
};

MarketPage.getLayout = function getLayout(page: ReactElement) {
  return <MeLayout>{page}</MeLayout>;
};

export default MarketPage;
