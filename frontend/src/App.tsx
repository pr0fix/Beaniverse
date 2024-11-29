import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useAdmin } from "./hooks/authHooks";
import { getUser, logoutUser } from "./reducers/authReducer";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/auth/Login";
import { initializeCoffees } from "./reducers/coffeeReducer";
import Home from "./components/Home";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const isAdmin = useAdmin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const initializeAuth = () => {
      dispatch(getUser());
      dispatch(initializeCoffees());
      setIsLoading(false);
    };
    initializeAuth();
  }, [dispatch]);

  if (isLoading) return <CircularProgress />;

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          user.isAuthenticated && isAdmin ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/"
        element={
          user.isAuthenticated ? (
            <div>
              {isAdmin && (
                <Button variant="contained" onClick={() => navigate("/admin")}>
                  Admin Dashboard
                </Button>
              )}
              <Home />
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", fontWeight: "bold" }}
                onClick={handleSignOut}
              >
                sign out
              </Button>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/login"
        element={!user.isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
