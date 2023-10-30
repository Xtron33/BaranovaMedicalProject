import {AppDispatch} from "../store/store.ts";
import {instance} from "./api.ts";
import {TableColumnConfig, TableDataItem} from "@gravity-ui/uikit";
import {AnalyzTableSlice} from "../store/slice/AnalyzTableSlice.ts";
import {IAnalyz} from "../store/models/IAnalyz.ts";
import {AnalyzSlice} from "../store/slice/AnalyzSlice.ts";

export const fetchAllData = async (dispatch: AppDispatch, page: number, limit: number) => {
    try{
        dispatch(AnalyzTableSlice.actions.setIsLoading(true));
        const colums = await instance.get<TableColumnConfig<TableDataItem>[]>('http://localhost:5000/api/analyz/columns')
        dispatch(AnalyzTableSlice.actions.setColums(colums.data));
        const data = await instance.get<[IAnalyz[],number]>(`http://localhost:5000/api/analyz/all?page=${page}&limit=${limit}`)
        dispatch(AnalyzTableSlice.actions.setTable(data.data[0]))
        dispatch(AnalyzTableSlice.actions.setCount(data.data[1]))
        dispatch(AnalyzTableSlice.actions.setIsLoading(false))

    } catch (e) {
        let error:string = "Something bad gooing"

        if(e instanceof Error){
            error = e.message
        }

        dispatch(AnalyzTableSlice.actions.setError(error))
        dispatch(AnalyzTableSlice.actions.setIsLoading(false))
    }
}

export const fetchAllUser = async (dispatch: AppDispatch, page: number, limit: number) => {
    try{
        dispatch(AnalyzTableSlice.actions.setIsLoading(true));
        const data = await instance.get<[IAnalyz[],number]>(`http://localhost:5000/api/analyz/user?page=${page}&limit=${limit}`)
        dispatch(AnalyzTableSlice.actions.setTable(data.data[0]))
        dispatch(AnalyzTableSlice.actions.setCount(data.data[1]))
        dispatch(AnalyzTableSlice.actions.setIsLoading(false))

    } catch (e) {
        let error:string = "Something bad gooing"

        if(e instanceof Error){
            error = e.message
        }
        dispatch(AnalyzTableSlice.actions.setError(error))
        dispatch(AnalyzTableSlice.actions.setIsLoading(false))
    }
}

export const fetchOneById = async (dispatch: AppDispatch, id:string | undefined) => {
    try{
        dispatch(AnalyzSlice.actions.setIsLoading(true));
        const data = await instance.get<IAnalyz>('http://localhost:5000/api/analyz/'+id)
        dispatch(AnalyzSlice.actions.setData(data.data));
        dispatch(AnalyzSlice.actions.setIsLoading(false))

    } catch (e) {
        let error:string = "Something bad gooing"

        if(e instanceof Error){
            error = e.message
        }

        dispatch(AnalyzSlice.actions.setError(error))
        dispatch(AnalyzSlice.actions.setIsLoading(false))
    }
}
export const predicate = async (data: IAnalyz) =>{
    try {
        return await instance.post<number>("http://localhost:5000/api/analyz/predicate", data)
    }
    catch (e){

    }
}
export const createAnalyz = async (data: IAnalyz) =>{
    try {
        return await instance.post("http://localhost:5000/api/analyz/create", data)
    }
    catch (e){

    }
}