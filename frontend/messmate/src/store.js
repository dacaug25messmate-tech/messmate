import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./loggedSlice";
import subscriptionReducer from "./subscriptionSlice";
import adminUsersReducer from "./adminUsersSlice";
import adminPendingUsersReducer from "./adminPendingUsersSlice";
import adminFeedbackReducer from "./adminFeedbackSlice";

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    subscriptions: subscriptionReducer,
    adminUsers: adminUsersReducer,
    adminPendingUsers: adminPendingUsersReducer,
    adminFeedback: adminFeedbackReducer
  }
});
