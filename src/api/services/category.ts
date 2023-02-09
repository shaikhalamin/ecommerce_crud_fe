import { axiosPrivate } from "../lib/axios-private";

export const getCategory = async () => {
  return axiosPrivate.get(`/category`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};