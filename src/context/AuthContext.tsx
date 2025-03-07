import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  exp: number;
}

interface User {
  accessToken: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = Cookies.get("user");
  const parsedUser: User | null = user ? JSON.parse(user) : null;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!parsedUser?.accessToken
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedUser) {
      const { accessToken } = parsedUser;
      try {
        const decodedToken: DecodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          logout();
          navigate("/user/login", { replace: true });
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        logout();
        navigate("/user/login", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      navigate("/user/login", { replace: true });
    }
  }, [parsedUser, navigate]);

  const login = (user: User) => {
    Cookies.set("user", JSON.stringify(user));
    setIsAuthenticated(true);
    navigate("/home/movies", { replace: true });
  };

  const logout = () => {
    Cookies.remove("user");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
