import { configureStore } from "@reduxjs/toolkit"
import  loggedReducer  from "./loggedSlice"
import adminUsersReducer from "./adminUsersSlice";
import adminPendingUsersReducer from "./adminPendingUsersSlice";
import adminFeedbackReducer from "./adminFeedbackSlice";

export default configureStore({
    reducer: {
        logged: loggedReducer,
        adminUsers: adminUsersReducer,
        adminFeedback: adminFeedbackReducer,
        adminPendingUsers: adminPendingUsersReducer
    }
})


 