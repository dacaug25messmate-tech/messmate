import { configureStore } from "@reduxjs/toolkit"
import  loggedReducer  from "./loggedSlice"
import adminUsersReducer from "./adminUsersSlice";

export default configureStore({
    reducer: {
        logged: loggedReducer,
        adminUsers: adminUsersReducer
    }
})