import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post-slice";



export const store = configureStore({
  reducer: postReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
