import { configureStore } from "@reduxjs/toolkit"
import  loggedReducer  from "./loggedSlice"
import adminUsersReducer from "./adminUsersSlice";
import adminPendingUsersReducer from "./adminPendingUsersSlice";
import foodItemRequestsReducer from "./foodItemRequestsSlice";
import messOwnerRequestsReducer from "./messOwnerFoodRequestSlice";
import subCategoriesReducer from "./subCategoriesSlice";
import messOwnerCustomersReducer from "./messOwnerCustomersSlice";
import adminFeedbackReducer from "./adminFeedbackSlice"; 
import messOwnerRatingsReducer from "./messOwnerRatingsSlice"; 

export default configureStore({
    reducer: {
        logged: loggedReducer,
        adminUsers: adminUsersReducer,  
        adminPendingUsers: adminPendingUsersReducer,
        foodRequests: foodItemRequestsReducer,
        messOwnerRequests: messOwnerRequestsReducer,
        subCategories: subCategoriesReducer,
        messOwnerCustomers: messOwnerCustomersReducer,
        adminFeedback: adminFeedbackReducer,
        messOwnerRatings:messOwnerRatingsReducer
    }
});
