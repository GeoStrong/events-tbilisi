import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";
import authReducer from "./authSlice";
import followerReducer from "./followerSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    auth: authReducer,
    follower: followerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // The Google Maps `Map` instance is non-serializable. We intentionally
        // keep a reference to the instance in the `map` slice for convenience
        // (used throughout the codebase). Disable the serializable-state
        // invariant for this specific action and state path to avoid dev warnings.
        ignoredActions: ["map/setMap"],
        ignoredPaths: ["map.map"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
