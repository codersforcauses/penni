import { AxiosError } from "axios";

import api from "@/lib/api";

type AxiosCustomError = AxiosError<{
  message: string;
}>;

export const checkUnique = async (input: string): Promise<boolean> => {
  try {
    // this check logic should be revised, it will be a mess as data amount grows.
    const response = await api.get("app/users/");
    // axios automatically parses the response as JSON if the content type is application/json
    const data = response.data;
    for (const profile of data) {
      if (profile.full_name === input) {
        return true;
      }
    }
    return false;
  } catch (error) {
    const axiosError = error as AxiosCustomError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        `Server responded with status: ${axiosError.response.status}`,
      );
    } else if (axiosError.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error in setting up request: ${axiosError.message}`);
    }
  }
};
