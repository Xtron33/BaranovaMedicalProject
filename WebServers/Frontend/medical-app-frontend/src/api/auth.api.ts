import {IUserData} from "../utils/types.ts";
import {instance} from "./api.ts";
import {IUser} from "../store/models/IUser.ts";

export const AuthApi = {



    async login(userData: IUserData): Promise<any | undefined>{
            const {data} = await instance.post<IUserData>('auth/login', userData)


            return data


    },
    async getUser(): Promise<IUser | undefined>{
        const {data} = await instance.get<IUser>('auth/profile')
        if (data) return data
    }
}