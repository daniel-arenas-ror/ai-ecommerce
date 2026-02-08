import connector from "../../connector";
import type { User } from "../../../types/user";

export const loginUser = (token: string): Promise<User> => {
  return connector.post(`/api/v1/auth/google_login`, { token: token }) as Promise<User>;
};
