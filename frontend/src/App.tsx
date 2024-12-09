import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useAdmin } from "./hooks/authHooks";
import { getUser, logoutUser } from "./reducers/authReducer";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/auth/Login";
import { initializeCoffees } from "./reducers/coffeeReducer";
import Products from "./components/Products";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const isAdmin = useAdmin();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await Promise.all([dispatch(getUser()), dispatch(initializeCoffees())]);
      setIsLoading(false);
    };
    initializeAuth();
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Navbar handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={user.isAuthenticated}
              isAdmin={isAdmin}
              requireAdmin
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Products />} />
        <Route
          path="/login"
          element={
            user.isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
