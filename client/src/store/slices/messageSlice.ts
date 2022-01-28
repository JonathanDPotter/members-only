import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { Imessage } from "../../interfaces/message";

export interface ImessageSliceState {
  messages: Imessage[] | null;
}

const initialState: ImessageSliceState = {
  messages: null,
};

export const messageSlice = createSlice({
  name: "messages",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMessage: (
      state: ImessageSliceState,
      action: PayloadAction<Imessage>
    ) => {
      if (state.messages) {
        state.messages = [...state.messages, action.payload];
      } else {
        state.messages = [action.payload];
      }
    },
  },
});

export const { addMessage } = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
