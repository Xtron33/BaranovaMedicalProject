import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Progress{
    progress: number,
    isLoading: boolean
}

const initialState:Progress = {
    progress: 0,
    isLoading: false
}

export const UploadProgresSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {

        setProgress(state, action:PayloadAction<number>){
            state.progress = action.payload
        },
        setIsLoading(state, action:PayloadAction<boolean>){
            state.isLoading = action.payload
        }
    }
})

export default UploadProgresSlice.reducer