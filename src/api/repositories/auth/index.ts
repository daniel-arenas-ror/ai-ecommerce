import connector from "../../connector";
import type { User } from "../../../types/user";

export const loginUser = (token: string): Promise<User> => {
  return connector.post(`/api/v1/auth/google_login`, { token: token }) as Promise<User>;
};

export const requestOTP = (login: string): Promise<void> => {
  return connector.post(`/api/v1/auth/request_otp`, { login }) as Promise<void>;
}

export const verifyOTP = (login: string, code: string): Promise<void> => {
  return connector.post(`/api/v1/auth/verify_otp`, { login }) as Promise<void>;
}
