import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TableColumnConfig, TableDataItem} from "@gravity-ui/uikit";
import {IAnalyz} from "../models/IAnalyz.ts";

interface TableState{
    Tables: IAnalyz[];
    ColumnsName: TableColumnConfig<TableDataItem>[];
    isLoading: boolean;
    count: number
    error: string;
}

const initialState: TableState = {
    Tables: [],
    ColumnsName: [],
    isLoading: false,
    count: 0,
    error: ''
}

export const AnalyzTableSlice = createSlice({
    name:'analyz-table',
    initialState,
    reducers:{
        setTable(state, action: PayloadAction<IAnalyz[]>){
            state.Tables = action.payload
        },
        setIsLoading(state,action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setColums(state, action:PayloadAction<TableColumnConfig<TableDataItem>[]>){
            state.ColumnsName = action.payload
        },
        setCount(state, action:PayloadAction<number>){
            state.count = action.payload
        },
        setError(state,action:PayloadAction<string>){
            state.error = action.payload
        }
    }
})

export default AnalyzTableSlice.reducer