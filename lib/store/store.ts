import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
