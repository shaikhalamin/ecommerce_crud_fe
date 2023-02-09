import { axiosPublic } from "../lib/axios-public";

type LoginCredentials = {
  email: string;
  password: string;
};

export const login = async (loginData: LoginCredentials) => {
  return axiosPublic.post(`/auth/login`, loginData);
};


