import {ITable} from "../store/models/ITable.ts";
import {TableSlice} from "../store/slice/TableSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import {TableColumnConfig, TableDataItem} from "@gravity-ui/uikit";
import {DataSlice} from "../store/slice/DataSlice.ts";
import {instance} from "../../api/api.ts";

export const fetchData = async (dispatch: AppDispatch) => {
    try{
        dispatch(TableSlice.actions.setIsLoading(true));
        const colums = await instance.get<TableColumnConfig<TableDataItem>[]>('http://localhost:5000/api/data/columns')
        dispatch(TableSlice.actions.setColums(colums.data));
        const data = await instance.get<ITable[]>("http://localhost:5000/api/data")
        dispatch(TableSlice.actions.setTable(data.data))
        dispatch(TableSlice.actions.setIsLoading(false))

    } catch (e) {
        let error:string = "Something bad gooing"

        if(e instanceof Error){
            error = e.message
        }

        dispatch(TableSlice.actions.setError(error))
        dispatch(TableSlice.actions.setIsLoading(false))
    }
}

export const applyData = async (data: ITable) => {
    try {
        return await instance.post("http://localhost:5000/api/data", data)
    }
    catch (e){

    }
}

export const fetchDataById = async (dispatch: AppDispatch, id:string | undefined) => {
    try{
        dispatch(DataSlice.actions.setIsLoading(true));
        const data = await instance.get<ITable>('http://localhost:5000/api/data/'+id)
        dispatch(DataSlice.actions.setData(data.data));
        dispatch(DataSlice.actions.setIsLoading(false))

    } catch (e) {
        let error:string = "Something bad gooing"

        if(e instanceof Error){
            error = e.message
        }

        dispatch(TableSlice.actions.setError(error))
        dispatch(TableSlice.actions.setIsLoading(false))
    }
}

export const updateDataById = async (data: ITable, id:string | undefined) => {
    try {
        return await instance.patch('http://localhost:5000/api/data/'+id,data)
    }
    catch (e){

    }
}

export const DeleteDateById = async (id:string | undefined) => {
    try {
        return await instance.delete('http://localhost:5000/api/data/' + id)
    }
    catch (e){

    }
}

export const fetchDataPagination = async (dispatch: AppDispatch, page: number, limit: number) => {
    try{
        dispatch(TableSlice.actions.setIsLoading(true));
        const colums = await instance.get<TableColumnConfig<TableDataItem>[]>('http://localhost:5000/api/data/columns')
        dispatch(TableSlice.actions.setColums(colums.data));
        const data = await instance.get<[ITable[],number]>(`http://localhost:5000/api/data/pagination?page=${page}&limit=${limit}`)
        dispatch(TableSlice.actions.setTable(data.data[0]))
        dispatch(TableSlice.actions.setCount(data.data[1]))
        dispatch(TableSlice.actions.setIsLoading(false))

    } catch (e) {
        let error:string = "Something bad gooing"

        if(e instanceof Error){
            error = e.message
        }

        dispatch(TableSlice.actions.setError(error))
        dispatch(TableSlice.actions.setIsLoading(false))
    }
}