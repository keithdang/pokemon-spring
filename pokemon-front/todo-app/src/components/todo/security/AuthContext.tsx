import { createContext, useContext, useState, ReactNode } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

/* ---------- Types ---------- */
type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

/* ---------- Context ---------- */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

/* ---------- Provider ---------- */
export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers = config.headers || {}; // ensure headers is an object
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
