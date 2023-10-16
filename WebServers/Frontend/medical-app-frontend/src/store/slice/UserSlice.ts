import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../models/IUser.ts";
import {
    getThemeFromLocalStorage,
    removeTokenFromLocalStorage,
    setTokenToLocalStorage
} from "../../helpers/localstorage.helper.ts";

interface UserState{
    user: IUser
    isAuth: boolean
    theme: string
}

const initialState: UserState = {
    user: {
        email: " ",
        token: " ",
        role: " "
    },
    isAuth: false,
    theme: getThemeFromLocalStorage()
}

export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
            setTokenToLocalStorage('token', state.user.token)
        },
        logout: (state) => {
            state.isAuth = false
            state.user = {
                email: " ",
                token: " ",
                role: " "
            }
            removeTokenFromLocalStorage("token")
        },
        changeTheme: (state, action: PayloadAction<string>) =>{
            state.theme = action.payload
            setTokenToLocalStorage("theme", state.theme)
        }
    }
})

export default UserSlice.reducer