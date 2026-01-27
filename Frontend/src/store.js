import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./loggedSlice";
import adminUsersReducer from "./adminUsersSlice";
import adminPendingUsersReducer from "./adminPendingUsersSlice";
import adminFeedbackReducer from "./adminFeedbackSlice";
import ratingsReducer from "./ratingSlice";

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    adminUsers: adminUsersReducer,
    adminPendingUsers: adminPendingUsersReducer,
    adminFeedback: adminFeedbackReducer,
    ratings: ratingsReducer,
  },
});
