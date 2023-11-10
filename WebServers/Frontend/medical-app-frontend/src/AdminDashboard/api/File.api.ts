import { instance } from "../../api/api.ts";
import { AppDispatch } from "../../store/store.ts";
import { UploadProgresSlice } from "../store/slice/UploadProgresSlice.ts";

export const uploadData = async (file: FormData, dispatch: AppDispatch) => {
    try {
        dispatch(UploadProgresSlice.actions.setProgress(0))
        return instance.post<string>('file/upload', file, {
            onUploadProgress: upload => {
                if (upload.total) {
                    dispatch(UploadProgresSlice.actions.setProgress(
                        Math.round((100 * upload.loaded) / upload.total)
                    ))
                }

            }
        })
    }
    catch (e) {

    }
}