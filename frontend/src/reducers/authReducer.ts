import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/auth";
import { AppDispatch } from "../store";
import { LoginCredentials } from "../types";

interface UserState {
  username: string;
  name: string;
  isAuthenticated: boolean;
  authToken: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  username: "",
  name: "",
  isAuthenticated: false,
  authToken: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (
      state,
      action: PayloadAction<{ username: string; name: string; token: string }>
    ) => {
      state.loading = false;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.authToken = action.payload.token;
      state.isAuthenticated = true;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: () => initialState,
  },
});

export const { authStart, authSuccess, authFailure, signOut } =
  authSlice.actions;

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(authSuccess(loggedInUser));
      authService.setToken(loggedInUser.token);
    }
  };
};

export const loginUser = (credentials: LoginCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user = await authService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      authService.setToken(user.token);
      dispatch(authSuccess(user));
    } catch (error) {
      dispatch(authFailure(error instanceof Error ? error.message : "Internal server error"));
    }
  };
};

export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(signOut());
  };
};

export default authSlice.reducer;
