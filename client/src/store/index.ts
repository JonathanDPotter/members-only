import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// reducers
import { authReducer } from "./slices/authSlice";
import { messageReducer } from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
