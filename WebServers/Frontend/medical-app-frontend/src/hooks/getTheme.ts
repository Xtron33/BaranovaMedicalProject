import {useAppSelector} from "../store/hooks.ts";

export const useTheme = (): string => {
    return useAppSelector((state) => state.UserReducer.theme)
}