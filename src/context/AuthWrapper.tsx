import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface AuthWrapperProps {
  redirectPath?: string;
}

const AuthWrapper = ({ redirectPath = "/user/login" }: AuthWrapperProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate replace to={redirectPath} />;
};

export default AuthWrapper;
