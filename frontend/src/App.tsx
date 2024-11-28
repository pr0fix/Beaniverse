import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useAdmin } from "./hooks/authHooks";
import { getUser, logoutUser } from "./reducers/authReducer";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/Login";
import { initializeCoffees } from "./reducers/coffeeReducer";

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

  if (isLoading) return <div>loading...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={!user.isAuthenticated ? <Login /> : <Navigate to="/" />}
      />

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
              <div>hello {user.name}</div>
              <button onClick={handleSignOut}>sign out</button>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
