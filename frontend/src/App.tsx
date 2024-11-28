import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/authHooks";
import { getUser, logoutUser } from "./reducers/authReducer";
import Login from "./components/Login";

const App = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div>
      {!user.isAuthenticated ? (
        <Login />
      ) : (
        <div>
          hello {user.name} <button onClick={handleSignOut}>sign out</button>
        </div>
      )}
    </div>
  );
};

export default App;
