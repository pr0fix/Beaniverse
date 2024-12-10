import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/auth";
import { AppDispatch } from "../store";
import {
  LoginCredentials,
  AuthResponse,
  SignUpCredentials,
} from "../utils/types";

interface UserState {
  username: string;
  name: string;
  isAuthenticated: boolean;
  authToken: string | null;
  role: string;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  username: "",
  name: "",
  isAuthenticated: false,
  authToken: null,
  role: "",
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
      action: PayloadAction<{
        username: string;
        name: string;
        role: string;
      }>
    ) => {
      state.loading = false;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.role = action.payload.role;
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
    const storedToken = window.localStorage.getItem("userToken");

    if (loggedInUserJSON && storedToken) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(authSuccess(loggedInUser));
      authService.setToken(storedToken.replace("Bearer ", ""));
    }
  };
};

export const loginUser = (credentials: LoginCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: AuthResponse = await authService.login(credentials);

      const userForStorage = {
        name: user.name,
        username: user.username,
        role: user.role,
      };
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(userForStorage)
      );
      dispatch(authSuccess(userForStorage));
    } catch (error) {
      dispatch(
        authFailure(
          error instanceof Error ? error.message : "Internal server error"
        )
      );
    }
  };
};

export const signUpUser = (credentials: SignUpCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: AuthResponse = await authService.signup(credentials);

      if (user) {
        const loginCredentials = {
          username: credentials.username,
          password: credentials.password,
        };
        dispatch(loginUser(loginCredentials));
      }
    } catch (error) {
      dispatch(
        authFailure(error instanceof Error ? error.message : "Signup failed")
      );
    }
  };
};

export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    window.localStorage.removeItem("loggedInUser");
    authService.logout();
    dispatch(signOut());
  };
};

export default authSlice.reducer;
