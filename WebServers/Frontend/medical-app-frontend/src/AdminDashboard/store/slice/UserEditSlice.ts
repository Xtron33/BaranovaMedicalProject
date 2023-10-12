import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../models/IUser.ts";

interface UserEditState{
    Data: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: UserEditState = {
    Data: {
        role: "user"
    } as IUser,
    isLoading: false,
    error: ''
}

export const UserEditSlice = createSlice({
    name: "user-edit",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<IUser>){
            state.Data = action.payload
        },
        setIsLoading(state,action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state,action:PayloadAction<string>){
            state.error = action.payload
        },
        setEmail(state,action:PayloadAction<string>){
            state.Data.email = action.payload
        },
        setPassword(state,action:PayloadAction<string>){
            state.Data.password = action.payload
        },
        setRole(state,action:PayloadAction<string>){
            state.Data.role = action.payload
        },
        resetState(){
            return initialState
        }
    }
})

export default UserEditSlice.reducer