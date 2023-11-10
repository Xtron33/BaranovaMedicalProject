import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper.ts";


const API_KEY = "http://localhost:5000/api"

export const instance = axios.create({
    baseURL: API_KEY
});




instance.interceptors.request.use(
    async config => {
        const key = getTokenFromLocalStorage()
        config.headers['Authorization'] = `Bearer ${key}`
        config.headers['Accept'] = 'application/json'

        return config
    },
    error => {
        Promise.reject(error)
    }

);