import { configureStore } from "@reduxjs/toolkit"
import  loggedReducer  from "./loggedSlice"
import adminUsersReducer from "./adminUsersSlice";
import adminPendingUsersReducer from "./adminPendingUsersSlice";

export default configureStore({
    reducer: {
        logged: loggedReducer,
        adminUsers: adminUsersReducer,
        adminPendingUsers: adminPendingUsersReducer
    }
})