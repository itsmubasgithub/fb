import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import postReducer from "../features/posts/postSlice";
import requestReducer from "../features/requests/requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    requests: requestReducer,
  },
});
