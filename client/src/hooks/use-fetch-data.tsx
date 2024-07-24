import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api";

function useFetchData(apiEndpoint: string, trigger: boolean) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!trigger) return;
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiEndpoint);
        setData(response.data);
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
    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
}

export default useFetchData;
