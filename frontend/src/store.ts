import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import coffeeReducer from "./reducers/coffeeReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    coffees: coffeeReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
