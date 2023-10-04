import {ITable} from "../models/ITable.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TableColumnConfig, TableDataItem} from "@gravity-ui/uikit";

interface TableState{
    Tables: ITable[];
    ColumnsName: TableColumnConfig<TableDataItem>[];
    isLoading: boolean;
    error: string;
}

const initialState: TableState = {
    Tables: [],
    ColumnsName: [],
    isLoading: false,
    error: ''
}

export const TableSlice = createSlice({
    name:'table',
    initialState,
    reducers:{
        setTable(state, action: PayloadAction<ITable[]>){
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

export default TableSlice.reducer