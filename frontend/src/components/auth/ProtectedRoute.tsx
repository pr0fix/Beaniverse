import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  isAuthenticated,
  isAdmin,
  requireAdmin,
}: ProtectedRouteProps) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" />;
  return <>{children}</>;
};
