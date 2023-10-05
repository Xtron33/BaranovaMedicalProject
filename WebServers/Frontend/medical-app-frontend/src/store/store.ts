import {combineReducers, configureStore} from "@reduxjs/toolkit";
import TableReducer from "../AdminDashboard/store/slice/TableSlice.ts"
import DataReducer from "../AdminDashboard/store/slice/DataSlice.ts"
import UserReducer from "../store/slice/UserSlice.ts"

const rootReducer = combineReducers({
    TableReducer,
    DataReducer,
    UserReducer

})
export const store = () => {return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']