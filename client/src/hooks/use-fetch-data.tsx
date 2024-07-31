import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api";

// useFetchData hook should only be called at the top level of your functional component, not inside any function or conditional block.
function useFetchData(apiEndpoint: string | null, trigger: boolean) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!apiEndpoint || !trigger) return;
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
