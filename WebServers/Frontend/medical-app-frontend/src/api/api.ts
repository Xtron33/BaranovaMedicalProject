import axios from "axios";
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";


export const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
});




instance.interceptors.request.use(
    async config => {
        const key = getTokenFromLocalStorage()
        config.headers['Authorization'] = `Bearer ${key}`
        config.headers['Accept']='application/json'

        return config
    },
    error => {
        Promise.reject(error)
    }

);