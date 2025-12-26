import { apiClient } from "./ApiClient";

/* ---------- Types ---------- */
type JwtResponse = {
  token: string;
};

type AxiosResponse<T = any> = import("axios").AxiosResponse<T>;

/* ---------- Functions ---------- */

// Basic Authentication
export const executeBasicAuthenticationService = (
  token: string
): Promise<AxiosResponse> => {
  return apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
};

// JWT Authentication
export const executeJwtAuthenticationService = (
  username: string,
  password: string
): Promise<AxiosResponse<JwtResponse>> => {
  return apiClient.post<JwtResponse>("/authenticate", { username, password });
};
