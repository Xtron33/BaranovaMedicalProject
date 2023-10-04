import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../models/IUser.ts";

interface UserState{
    user: IUser | null
    isAuth: boolean
}

const initialState: UserState = {
    user: null,
    isAuth: false
}

export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
            state.user = null
        }
    }
})

export default UserSlice.reducer