import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useAdmin } from "./hooks/authHooks";
import { getUser, logoutUser } from "./reducers/authReducer";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/auth/Login";
import { initializeCoffees } from "./reducers/coffeeReducer";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Navbar from "./components/e-commerce/Navbar";
import Home from "./components/e-commerce/Home";
import Products from "./components/e-commerce/Products";
import background from "./assets/general_background.png";
import SignUp from "./components/auth/SignUp";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const isAdmin = useAdmin();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([dispatch(getUser()), dispatch(initializeCoffees())]);
      setIsLoading(false);
    };
    initializeApp();
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <>
      <div
        className="fixed inset-0 bg-center -z-10 min-h-screen bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      />
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
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/login"
          element={
            user.isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            user.isAuthenticated ? <Navigate to="/" replace /> : <SignUp />
          }
        />
      </Routes>
    </>
  );
};

export default App;
