import { Slice, createSlice } from "@reduxjs/toolkit";
import { UserRootState } from "../types";



export const userSlice: Slice<UserRootState> = createSlice({
    name: "userData",
    initialState: {
        user: {
            _id: '',
            contact: '',
            name: '',
            password: ''
        },
        login: false,
    } as UserRootState,
    reducers: {
        setUser: (state: UserRootState, action: any) => {
            return { ...state, user: { ...action.payload }, login: action.payload._id ? true : false };
        }       
    }
});

export const selectUser = (state: UserRootState) => state.user;
// export const selectAllUsers = (state: RootStateType) => state.allUers;
// export const selectAllFriends = (state: RootStateType) => state.friends;

export const { 
    setUser
} = userSlice.actions;

