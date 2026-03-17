import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import requestReducer from "./requestSlice"


const store = configureStore({
    //שומר את הרדיוסרים
    reducer: {
        users: userReducer,
        request: requestReducer
    }
})
export default store
