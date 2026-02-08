import connector from "../../connector";
import type { User } from "../../../types/user";

export const loginUser = (): Promise<User> => {
  return connector.get('/api/v1/google_login') as Promise<User>;
};
