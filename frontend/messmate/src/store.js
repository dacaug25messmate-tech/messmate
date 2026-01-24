import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./loggedSlice";
import adminUsersReducer from "./adminUsersSlice";
import foodItemRequestsReducer from "./foodItemRequestsSlice";
import messOwnerRequestsReducer from "./messOwnerFoodRequestSlice";
import subCategoriesReducer from "./subCategoriesSlice";

export default configureStore({
  reducer: {
    logged: loggedReducer,
    adminUsers: adminUsersReducer,
    foodRequests: foodItemRequestsReducer,
    messOwnerRequests: messOwnerRequestsReducer,
    subCategories: subCategoriesReducer,
  },
});
