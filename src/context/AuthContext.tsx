import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  exp: number;
}

interface User {
  accessToken: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
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

  const login = () => {
    Cookies.set(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2FhZGYxMTAtYmJlYy00MDhmLTliMzktZDU2ZTZhZWFhZWNlIiwidXNlcklkIjoiNzkxOTU5NWUtMDAxMS03MGM1LTkwMDAtMWMzODhhOTg0NjVhIiwic3RyaXBlSWQiOiJjdXNfUnl1UVFZVkNaVU52eXoiLCJzdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJzdHJpcGVTdWJzY3JpcHRpb25JZCI6InN1Yl8xUWFjZ2JTSFpVbktDc3ZyYVVFR0ZOZTIiLCJzdHJpcGVTY2hlZHVsZUlkIjpudWxsLCJ1c2VyUm9sZSI6MywicHJvZHVjdEluZm8iOmZhbHNlLCJlbWFpbCI6ImFqYXlwdGwwNDAxQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFqYXkiLCJsYXN0TmFtZSI6IlBhdGVsIiwib3JnYW5pemF0aW9uIjoiIiwidXNlck5hbWUiOm51bGwsImNvbXBhbnlOZXdzIjpmYWxzZSwib2ZmZXJzIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0xMi0yNlQwOTo1NDoxNS42OTlaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0yMVQwMzo1MToxOS4xODVaIiwic3Vic2NyaXB0aW9uSWQiOiJmNjY1OTFmOC1mZWZlLTQzZWUtOTIzNy1mOGUyNDU3MzM4OGMiLCJpbWFnZSI6Imh0dHBzOi8vbW9udGFnZS1kYXRhLWRldi5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91c2VyLzNhYWRmMTEwLWJiZWMtNDA4Zi05YjM5LWQ1NmU2YWVhYWVjZS9wcm9maWxlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1Db250ZW50LVNoYTI1Nj1VTlNJR05FRC1QQVlMT0FEJlgtQW16LUNyZWRlbnRpYWw9QUtJQTJMSVBaWkNIVk9QM0RONVAlMkYyMDI1MDQzMCUyRnVzLXdlc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA0MzBUMDUzODUxWiZYLUFtei1FeHBpcmVzPTg2NDAwJlgtQW16LVNpZ25hdHVyZT1lN2YxZDFhMmZhMjRjNmU2ZjFkMjdhZDgyOTNkODg4MzMxZmQ0Y2M4YTY5YTFiZTkwMzZiZGVlYTQ2ZTJkZjgyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ4LWlkPUdldE9iamVjdCJ9LCJ1c2VySWQiOiI3OTE5NTk1ZS0wMDExLTcwYzUtOTAwMC0xYzM4OGE5ODQ2NWEiLCJpc0FkbWluIjpmYWxzZSwiaGFzQWRtaW5QYW5lbEFjY2VzcyI6dHJ1ZSwiY29nbml0byI6eyJzdWIiOiI3OTE5NTk1ZS0wMDExLTcwYzUtOTAwMC0xYzM4OGE5ODQ2NWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91cy13ZXN0LTFfQjRnUEJvUXNVIiwiY29nbml0bzp1c2VybmFtZSI6Ijc5MTk1OTVlLTAwMTEtNzBjNS05MDAwLTFjMzg4YTk4NDY1YSIsInByZWZlcnJlZF91c2VybmFtZSI6IkFqYXkiLCJnaXZlbl9uYW1lIjoiQWpheSIsIm9yaWdpbl9qdGkiOiI3OTlkMzFhYi01ZWJhLTRjZDAtODg3Ni0xNzFlMWJmMWNlNTIiLCJhdWQiOiIyb25ydDZtdmFrOTEwZ2c1YXBwM3BodHN1OSIsImV2ZW50X2lkIjoiZTY2OWE3NjYtZTkzYS00MTU2LWIxMDAtYWQ3NzI1MWJiN2FlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NDU5OTE1MzEsIm5hbWUiOiJBamF5IFBhdGVsIiwiZXhwIjoxNzQ1OTk1MTMxLCJpYXQiOjE3NDU5OTE1MzEsImZhbWlseV9uYW1lIjoiUGF0ZWwiLCJqdGkiOiI3ZDQwNmJlZi05ODljLTQxOTMtODA3Yy0zNzc4ZmNmNjBjMjciLCJlbWFpbCI6ImFqYXlwdGwwNDAxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDU5OTE1MzEsImV4cCI6MTc0Njg1NTUzMX0.BVk9jzXqqLFn1yS7jSgGyvCjTPS4ToHT5L4H0ORsVNs"
    );
    setIsAuthenticated(true);
    navigate("/home", { replace: true });
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
