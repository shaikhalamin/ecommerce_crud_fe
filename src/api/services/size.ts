import { axiosPrivate } from "../lib/axios-private";

export const getProductSize = async () => {
  return axiosPrivate.get(`/size`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
