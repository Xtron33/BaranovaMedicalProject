import {combineReducers, configureStore} from "@reduxjs/toolkit";
import TableReducer from "../AdminDashboard/store/slice/TableSlice.ts"
import DataReducer from "../AdminDashboard/store/slice/DataSlice.ts"
import UserTabelReducer from "../AdminDashboard/store/slice/UserTableSlice.ts"
import UserReducer from "../store/slice/UserSlice.ts"
import UserEditReducer from "../AdminDashboard/store/slice/UserEditSlice.ts"
import ProgressReducer from "../AdminDashboard/store/slice/UploadProgresSlice.ts"
import AnalyzReducer from "./slice/AnalyzSlice.ts"
import AnalyzTableReducer from "./slice/AnalyzTableSlice.ts"

const rootReducer = combineReducers({
    TableReducer,
    DataReducer,
    UserReducer,
    UserTabelReducer,
    UserEditReducer,
    ProgressReducer,
    AnalyzReducer,
    AnalyzTableReducer

})
export const store = () => {return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']