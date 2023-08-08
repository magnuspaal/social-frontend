import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post-slice";
import alertReducer from "./alert-slice";


export const store = configureStore({
  reducer: {
    post: postReducer,
    alert: alertReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
