import {useAppSelector} from "../store/hooks.ts";

export const useEmail = (): string => {
    return useAppSelector((state) => state.UserReducer.user.email)
}