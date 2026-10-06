import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "../slices/user";

const store = configureStore({
    reducer:{
        userInfo:useReducer,
    }
})

export default store