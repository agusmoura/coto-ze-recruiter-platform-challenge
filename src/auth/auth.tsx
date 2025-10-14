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
  const [token, setToken] = useState<string | null>(null);

  const login = async (user: User) => {
    const { email, pass } = user;

    if (email === "recruiter@coto.com" && pass === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      setToken("demo-token");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
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
