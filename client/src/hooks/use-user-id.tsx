import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as { user_id: string };
        setUserId(decoded.user_id);
        setLoading(false);
      } catch (e) {
        setError("Invalid token");
        setLoading(false);
      }
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, []);

  return { userId, loading, error };
};

export default useUserId;
