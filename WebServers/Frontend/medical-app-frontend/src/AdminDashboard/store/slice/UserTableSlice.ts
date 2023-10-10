
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TableColumnConfig, TableDataItem} from "@gravity-ui/uikit";
import {IUser} from "../models/IUser.ts";

interface UserTableState{
    Tables: IUser[];
    ColumnsName: TableColumnConfig<TableDataItem>[];
    isLoading: boolean;
    error: string;
}

const initialState: UserTableState = {
    Tables: [],
    ColumnsName: [],
    isLoading: false,
    error: ''
}

export const UserTableSlice = createSlice({
    name:'tableUser',
    initialState,
    reducers:{
        setTable(state, action: PayloadAction<IUser[]>){
            state.Tables = action.payload
        },
        setIsLoading(state,action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setColums(state, action:PayloadAction<TableColumnConfig<TableDataItem>[]>){
            state.ColumnsName = action.payload
        },
        setError(state,action:PayloadAction<string>){
            state.error = action.payload
        }
    }
})

export default UserTableSlice.reducer