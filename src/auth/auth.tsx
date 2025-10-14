import { createContext, useMemo, useState } from "react";

type User = {
  email: string;
  pass: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const savedToken = localStorage.getItem("authToken");
    return isAuth === "true" && savedToken ? savedToken : null;
  });

  const login = async (user: User) => {
    const { email, pass } = user;

    if (email === "recruiter@coto.com" && pass === "123456") {
      const token = crypto.randomUUID();
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authToken", token);
      setToken(token);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
