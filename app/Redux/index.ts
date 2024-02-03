import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./users";


export const store = configureStore({
    reducer: {
        User: userSlice.reducer,
    }
})