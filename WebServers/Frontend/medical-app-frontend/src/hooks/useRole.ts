import {useAppSelector} from "../store/hooks.ts";

export const useRole = (): string => {
    return useAppSelector((state) => state.UserReducer.user.role)
}