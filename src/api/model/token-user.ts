import { User } from "./user";

export type TokenUser = {
  access_token: string;
  refresh_token: string;
  user: User;
  expires_at: number;
};
