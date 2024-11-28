import { useAppSelector } from "./reduxHooks";

export const useAdmin = () => {
  const user = useAppSelector((state) => state.user);
  return user.isAuthenticated && user.role === "admin";
};
