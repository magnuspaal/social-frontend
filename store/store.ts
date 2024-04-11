import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post-slice";
import alertReducer from "./alert-slice";
import navigationSlice from "./navigation-slice";
import messagingSlice from "./messaging-slice";
import chatSlice from "./chat-slice";


export const store = configureStore({
  reducer: {
    post: postReducer,
    alert: alertReducer,
    navigation: navigationSlice,
    messaging: messagingSlice,
    chat: chatSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
