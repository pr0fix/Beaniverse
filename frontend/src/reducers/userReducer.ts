import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";
import { AppDispatch } from "../store";
import userService from "../services/user";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userOperationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userOperationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    removeUserSuccess: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      state.loading = false;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
  },
});

export const {
  userOperationStart,
  userOperationFailure,
  fetchUsersSuccess,
  addUserSuccess,
  removeUserSuccess,
  updateUserSuccess,
} = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userOperationStart());
    try {
      const users = await userService.getUsers();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(
        userOperationFailure(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    }
  };
};

export default userSlice.reducer;
