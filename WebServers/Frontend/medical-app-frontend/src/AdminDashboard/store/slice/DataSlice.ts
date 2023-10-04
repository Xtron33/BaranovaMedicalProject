import {ITable} from "../models/ITable.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DataState{
    Data: ITable;
    isLoading: boolean;
    error: string;
}

const initialState: DataState = {
    Data: {
        gender: 1,
        hormonalBackground: 0,
        cardivascularSystem: 0,
        genitourinarySystem: 0,
        gastrointestinalTract: 0,
        angiopathy: 0,
        tumorsOtherLocalization: 0,
        RBC: 0,
        MCV: 0,
        RDW: 0,
        RDWa: 0,
        HCT: 0,
        PLT: 0,
        MPV: 0,
        PDW: 0,
        PCT: 0,
        LPCR: 0,
        WBC: 0,
        HGB: 0,
        MCH: 0,
        MCHC: 0,
        LYM: 0,
        GRAN: 0,
        MID: 0,
        LIMProcent: 0,
        GRAProcent: 0,
        MIDProcent: 0,
        NEUT: 0,
        BO: 0,
        BASO: 0,
        MON: 0,
        Ultrasound: 0,},
    isLoading: false,
    error: ''
}

export const DataSlice = createSlice({
    name:'data',
    initialState,
    reducers:{
        setData(state, action: PayloadAction<ITable>){
            state.Data = action.payload
        },
        setIsLoading(state,action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state,action:PayloadAction<string>){
            state.error = action.payload
        },
        setCardio(state, action: PayloadAction<number>){
            state.Data.cardivascularSystem = action.payload
        },
        setGeni(state, action: PayloadAction<number>){
            state.Data.genitourinarySystem = action.payload
        },
        setGastr(state, action: PayloadAction<number>){
            state.Data.gastrointestinalTract = action.payload
        },
        setAnigopathy(state, action: PayloadAction<number>){
            state.Data.angiopathy = action.payload
        },
        setTumors(state, action: PayloadAction<number>){
            state.Data.tumorsOtherLocalization = action.payload
        },
        setGender(state, action: PayloadAction<number>){
            state.Data.gender = action.payload
        },
        setHormonalBackground(state, action: PayloadAction<number>){
            state.Data.hormonalBackground = action.payload
        },
        setRBC(state, action: PayloadAction<number>){
            state.Data.RBC = action.payload
        },
        setMCV(state, action: PayloadAction<number>){
            state.Data.MCV = action.payload
        },
        setRDW(state, action: PayloadAction<number>){
            state.Data.RDW = action.payload
        },
        setRDWa(state, action: PayloadAction<number>){
            state.Data.RDWa = action.payload
        },
        setHCT(state, action: PayloadAction<number>){
            state.Data.HCT = action.payload
        },
        setPLT(state, action: PayloadAction<number>){
            state.Data.PLT = action.payload
        },
        setMPV(state, action: PayloadAction<number>){
            state.Data.MPV = action.payload
        },
        setPDW(state, action: PayloadAction<number>){
            state.Data.PDW = action.payload
        },
        setPCT(state, action: PayloadAction<number>){
            state.Data.PCT = action.payload
        },
        setLPCR(state, action: PayloadAction<number>){
            state.Data.LPCR = action.payload
        },
        setWBC(state, action: PayloadAction<number>){
            state.Data.WBC = action.payload
        },
        setHGB(state, action: PayloadAction<number>){
            state.Data.HGB = action.payload
        },
        setMCH(state, action: PayloadAction<number>){
            state.Data.MCH = action.payload
        },
        setMCHC(state, action: PayloadAction<number>){
            state.Data.MCHC = action.payload
        },
        setLYM(state, action: PayloadAction<number>){
            state.Data.LYM = action.payload
        },
        setGRAN(state, action: PayloadAction<number>){
            state.Data.GRAN = action.payload
        },
        setMID(state, action: PayloadAction<number>){
            state.Data.MID = action.payload
        },
        setLIMProcent(state, action: PayloadAction<number>){
            state.Data.LIMProcent = action.payload
        },
        setGRAProcent(state, action: PayloadAction<number>){
            state.Data.GRAProcent = action.payload
        },
        setMIDProcent(state, action: PayloadAction<number>){
            state.Data.MIDProcent = action.payload
        },
        setNEUT(state, action: PayloadAction<number>){
            state.Data.NEUT = action.payload
        },
        setBO(state, action: PayloadAction<number>){
            state.Data.BO = action.payload
        },
        setBASO(state, action: PayloadAction<number>){
            state.Data.BASO = action.payload
        },
        setMON(state, action: PayloadAction<number>){
            state.Data.MON = action.payload
        },
        setUltrasound(state, action: PayloadAction<number>){
            state.Data.Ultrasound = action.payload
        },
        resetState(){
            return initialState
        }
    }
})

export default DataSlice.reducer