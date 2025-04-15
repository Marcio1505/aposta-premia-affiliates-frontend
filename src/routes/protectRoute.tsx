import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
