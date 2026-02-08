import connector from "../../connector";
import type { Task } from "../../../types/user";

export const loginUser = (): Promise<Task[]> => {
  return connector.get('/api/v1/google_login') as Promise<Task[]>;
};
