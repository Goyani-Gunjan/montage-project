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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzU5NTlhMGYtMmEyMS00YzYxLWFkMzgtMzQ4NjE4ZjM3OWU3IiwidXNlcklkIjoiYTlhOWM5MWUtNDBhMS03MDFlLWY0ZTEtOWZhMTQxYzRhY2E1Iiwic3RyaXBlSWQiOm51bGwsInN1YnNjcmlwdGlvblN0YXR1cyI6InRyaWFsaW5nIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOm51bGwsInN0cmlwZVNjaGVkdWxlSWQiOm51bGwsInVzZXJSb2xlIjozLCJwcm9kdWN0SW5mbyI6ZmFsc2UsImVtYWlsIjoiaGV4YWNvZGVydGVzdEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsIm9yZ2FuaXphdGlvbiI6ImhleGFhIiwidXNlck5hbWUiOm51bGwsImNvbXBhbnlOZXdzIjpmYWxzZSwib2ZmZXJzIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNS0wMy0wN1QxMDoyNjoyMy43MTRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0wN1QxMDoyNjoyMy43MjlaIiwic3Vic2NyaXB0aW9uSWQiOiI0Y2Q2MjRiZC1iNTM1LTRjZjItODA0Ni1lYzkxYmVmN2IzNzAiLCJpbWFnZSI6Imh0dHBzOi8vbW9udGFnZS1kYXRhLWRldi5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91c2VyLzc1OTU5YTBmLTJhMjEtNGM2MS1hZDM4LTM0ODYxOGYzNzllNy9wcm9maWxlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1Db250ZW50LVNoYTI1Nj1VTlNJR05FRC1QQVlMT0FEJlgtQW16LUNyZWRlbnRpYWw9QUtJQTJMSVBaWkNIVk9QM0RONVAlMkYyMDI1MDMwNyUyRnVzLXdlc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTAzMDdUMTI0MjM0WiZYLUFtei1FeHBpcmVzPTg2NDAwJlgtQW16LVNpZ25hdHVyZT1hZjBhMTIwNmFkYWNmM2I3Y2JkZjhiMjFjY2EwOGViNGY2MTM1YTQ2MTBhZmVmMjkzODQ2YjlkMTVjOTM1NGFmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ4LWlkPUdldE9iamVjdCJ9LCJ1c2VySWQiOiJhOWE5YzkxZS00MGExLTcwMWUtZjRlMS05ZmExNDFjNGFjYTUiLCJpc0FkbWluIjpmYWxzZSwiaGFzQWRtaW5QYW5lbEFjY2VzcyI6ZmFsc2UsImNvZ25pdG8iOnsiY3VzdG9tOm9yZ2FuaXphdGlvbiI6ImhleGFhIiwic3ViIjoiYTlhOWM5MWUtNDBhMS03MDFlLWY0ZTEtOWZhMTQxYzRhY2E1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vdXMtd2VzdC0xX0I0Z1BCb1FzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJhOWE5YzkxZS00MGExLTcwMWUtZjRlMS05ZmExNDFjNGFjYTUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIZXhhY29kZXJEZXYiLCJvcmlnaW5fanRpIjoiOTNlY2U4NmUtYTcxYS00ZWVlLTk5ODUtMDQyYjgzNWZjYTJhIiwiYXVkIjoiMm9ucnQ2bXZhazkxMGdnNWFwcDNwaHRzdTkiLCJldmVudF9pZCI6ImRiZGY4ZTY0LTE0NGQtNDRiMy04NDQ3LWI4NjMyODcxMTUyNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzQxMzUxMzUzLCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNzQxMzU0OTUzLCJpYXQiOjE3NDEzNTEzNTMsImp0aSI6ImE2YzM3MDZkLTg2MWQtNDI0MC04NzhkLTRmZjkwZTQ5MGY2YiIsImVtYWlsIjoiaGV4YWNvZGVydGVzdEBnbWFpbC5jb20ifSwiaWF0IjoxNzQxMzUxMzU0LCJleHAiOjE3NDIyMTUzNTR9.LP8rYftTYYoyCR1epSqetIYoy9zbykIPYUdgVP-X3F8"
    );
    setIsAuthenticated(true);
    navigate("/mainPage", { replace: true });
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
