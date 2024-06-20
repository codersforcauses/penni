import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export const usePings = (
  args?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["pings"],
    queryFn: () => api.get("/healthcheck/ping/").then((res) => res.data),
  });
};
