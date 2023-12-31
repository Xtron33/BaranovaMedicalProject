import { AppDispatch } from "../../store/store.ts";
import { TableSlice } from "../store/slice/TableSlice.ts";
import { instance } from "../../api/api.ts";
import { TableColumnConfig, TableDataItem } from "@gravity-ui/uikit";

import { UserTableSlice } from "../store/slice/UserTableSlice.ts";
import { IUser } from "../store/models/IUser.ts";
import { UserEditSlice } from "../store/slice/UserEditSlice.ts";



export const fetchUsers = async (dispatch: AppDispatch) => {
    try {
        dispatch(UserTableSlice.actions.setIsLoading(true));
        const colums = await instance.get<TableColumnConfig<TableDataItem>[]>('user/columns')
        dispatch(UserTableSlice.actions.setColums(colums.data));
        const data = await instance.get<IUser[]>("user")
        dispatch(UserTableSlice.actions.setTable(data.data))
        dispatch(UserTableSlice.actions.setIsLoading(false))

    } catch (e) {
        let error: string = "Something bad gooing"

        if (e instanceof Error) {
            error = e.message
        }

        dispatch(TableSlice.actions.setError(error))
        dispatch(TableSlice.actions.setIsLoading(false))
    }
}

export const fetchUser = async (dispatch: AppDispatch, id: string | undefined) => {
    try {
        dispatch(UserEditSlice.actions.setIsLoading(true))
        const data = await instance.get<IUser>("user/" + id)
        dispatch(UserEditSlice.actions.setData(data.data))

    }
    catch (e) {

    }
}

export const updateUserById = async (data: IUser, id: string | undefined) => {
    try {
        return await instance.patch('user/' + id, data)
    }
    catch (e) {

    }
}
export const DeleteUserById = async (id: string | undefined) => {
    try {
        return await instance.delete('user/' + id)
    }
    catch (e) {

    }
}

export const createUser = async (data: IUser) => {
    try {

        return await instance.post("user/createUser", data)

    }
    catch (e) {
    }
}

export const createSuperUser = async (data: IUser) => {
    try {
        return await instance.post("user/createAdmin", data)

    }
    catch (e) {
    }
}

export const fetchUsersPag = async (dispatch: AppDispatch, page: number, limit: number) => {
    try {
        dispatch(UserTableSlice.actions.setIsLoading(true));
        const colums = await instance.get<TableColumnConfig<TableDataItem>[]>('user/columns')
        dispatch(UserTableSlice.actions.setColums(colums.data));
        const data = await instance.get<[IUser[], number]>(`user/pagination?page=${page}&limit=${limit}`)
        dispatch(UserTableSlice.actions.setTable(data.data[0]))
        dispatch(UserTableSlice.actions.setCount(data.data[1]))
        dispatch(UserTableSlice.actions.setIsLoading(false))

    } catch (e) {
        let error: string = "Something bad gooing"

        if (e instanceof Error) {
            error = e.message
        }

        dispatch(TableSlice.actions.setError(error))
        dispatch(TableSlice.actions.setIsLoading(false))
    }
}