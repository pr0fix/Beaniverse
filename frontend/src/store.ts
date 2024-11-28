import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
