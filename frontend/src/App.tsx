import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useAdmin } from "./hooks/authHooks";
import { getUser, logoutUser } from "./reducers/authReducer";
import { initializeCoffees } from "./reducers/coffeeReducer";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/auth/Login";
import Navbar from "./components/e-commerce/Navbar";
import Home from "./components/e-commerce/Home";
import Products from "./components/e-commerce/Products";
import SignUp from "./components/auth/SignUp";
import Cart from "./components/e-commerce/Cart";

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
        <Route path="/cart" element={<Cart />} />
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
