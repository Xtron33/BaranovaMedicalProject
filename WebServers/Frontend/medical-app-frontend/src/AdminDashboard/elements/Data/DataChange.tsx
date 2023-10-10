import {Button, Icon, RadioButton, Switch} from "@gravity-ui/uikit";
import {analizeOpt, genderOpt, ultrasoundOpt} from "../../utils/DataRadioConst.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {CirclePlus} from "@gravity-ui/icons";
import {DataSlice} from "../../store/slice/DataSlice.ts";
import {useEffect, useState} from "react";
import {ITable} from "../../store/models/ITable.ts";
import {applyData, fetchDataById, updateDataById} from "../../api/Data.api.ts";


function DataChange(){

    type dataId = {
        dataId: string;
    };

    const id = useParams<dataId>()

    const dispatch = useAppDispatch()



    const navigate = useNavigate();


    const {Data, isLoading} = useAppSelector(state => state.DataReducer)


    const [cardioVal, setCardioVal] = useState<boolean>(false)
    const [geniVal, setGeniVal] = useState<boolean>(false)
    const [gastrVal, setGastrVal] = useState<boolean>(false)
    const [angiopathyVal, setAngiopathyVal] = useState<boolean>(false)
    const [tumorsVal, setTumorsVal] = useState<boolean>(false)

    if(id.dataId!=null){
        useEffect(()=>{
            fetchDataById(dispatch, id.dataId)

        },[])
        useEffect(() => {
            if(Data.cardivascularSystem===1){
                setCardioVal(true)
            }
            if(Data.genitourinarySystem===1){
                setGeniVal(true)
            }
            if(Data.gastrointestinalTract===1){
                setGastrVal(true)
            }
            if(Data.angiopathy===1){
                setAngiopathyVal(true)
            }
            if(Data.tumorsOtherLocalization===1){
                setTumorsVal(true)
        }},[isLoading])}
    else{
        useEffect(() => {
            dispatch(DataSlice.actions.resetState)
        }, []);

    }





    function changeCardio(value: boolean){
        setCardioVal(value);
        if(value){
            dispatch(DataSlice.actions.setCardio(1))
        }
        else{
            dispatch(DataSlice.actions.setCardio(0))
        }
    }

    function changeGeni(value: boolean){
        setGeniVal(value)
        if(value){
            dispatch(DataSlice.actions.setGeni(1))
        }
        else{
            dispatch(DataSlice.actions.setGeni(0))
        }
    }

    function changeGastr(value: boolean){
        setGastrVal(value)
        if(value){
            dispatch(DataSlice.actions.setGastr(1))
        }
        else{
            dispatch(DataSlice.actions.setGastr(0))
        }
    }

    function changeAngiopathy(value: boolean){
        setAngiopathyVal(value)
        if(value){
            dispatch(DataSlice.actions.setAnigopathy(1))
        }
        else{
            dispatch(DataSlice.actions.setAnigopathy(0))
        }
    }

    function changeTumors(value: boolean){
        setTumorsVal(value)
        if(value){
            dispatch(DataSlice.actions.setTumors(1))
        }
        else{
            dispatch(DataSlice.actions.setTumors(0))
        }
    }

    function apply(data: ITable){
        if(id.dataId!=null){
            updateDataById(data,id.dataId)
        }
        else{
            applyData(data);
        }

        navigate("/admin");
    }

    return(
        <>
            <div className="admin-container">

                <div className="admin-container__col">
                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Пол</span>
                        <RadioButton name="gender" onUpdate={(value) => dispatch(DataSlice.actions.setGender(parseInt(value)))} value={Data.gender===null ? "-2" : Data.gender.toString()} options={genderOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Гормональный фон</span>
                        <RadioButton name="hormon" onUpdate={(value) => dispatch(DataSlice.actions.setHormonalBackground(parseInt(value)))} value={Data.hormonalBackground===null ? "-2" : Data.hormonalBackground.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__switch">
                    <span className="admin-container__switch-text">
                        Сопутсвующие заболевания
                    </span>

                        <Switch className="admin-container__switch-opt" size="l" checked={cardioVal} onUpdate={(event) => changeCardio(event)}>Сердечно сосудистая система</Switch>

                        <Switch className="admin-container__switch-opt" size="l" checked={geniVal} onUpdate={(event) => changeGeni(event)}>Мочеполовая система</Switch>

                        <Switch className="admin-container__switch-opt" size="l" checked={gastrVal} onUpdate={(event) => changeGastr(event)}>Желудочно кишечный тракт</Switch>

                        <Switch className="admin-container__switch-opt" size="l" checked={angiopathyVal} onUpdate={(event) => changeAngiopathy(event)}>Ангиопатия</Switch>

                        <Switch className="admin-container__switch-opt" size="l" checked={tumorsVal} onUpdate={(event) => changeTumors(event)}>Опухоли другой локализации</Switch>
                    </div>


                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">RBC</span>
                        <RadioButton name="RBC" onUpdate={(value) => dispatch(DataSlice.actions.setRBC(parseInt(value)))} value={Data.RBC===null ? "-2" : Data.RBC.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MCV</span>
                        <RadioButton name="MCV" onUpdate={(value) => dispatch(DataSlice.actions.setMCV(parseInt(value)))} value={Data.MCV===null ? "-2" : Data.MCV.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">RDW</span>
                        <RadioButton name="RDW" onUpdate={(value) => dispatch(DataSlice.actions.setRDW(parseInt(value)))} value={Data.RDW===null ? "-2" : Data.RDW.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">RDWa</span>
                        <RadioButton name="RDWa" onUpdate={(value) => dispatch(DataSlice.actions.setRDWa(parseInt(value)))} value={Data.RDWa===null ? "-2" : Data.RDWa.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">HCT</span>
                        <RadioButton name="HCT" onUpdate={(value) => dispatch(DataSlice.actions.setHCT(parseInt(value)))} value={Data.HCT===null ? "-2" : Data.HCT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">PLT</span>
                        <RadioButton name="PLT" onUpdate={(value) => dispatch(DataSlice.actions.setPLT(parseInt(value)))} value={Data.PLT===null ? "-2" : Data.PLT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MPV</span>
                        <RadioButton name="MPV" onUpdate={(value) => dispatch(DataSlice.actions.setMPV(parseInt(value)))} value={Data.MPV===null ? "-2" : Data.MPV.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">PDW</span>
                        <RadioButton name="PDW" onUpdate={(value) => dispatch(DataSlice.actions.setPDW(parseInt(value)))} value={Data.PDW===null ? "-2" : Data.PDW.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">PCT</span>
                        <RadioButton name="PCT" onUpdate={(value) => dispatch(DataSlice.actions.setPCT(parseInt(value)))} value={Data.PCT===null ? "-2" : Data.PCT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">LPCR</span>
                        <RadioButton name="LPCR" onUpdate={(value) => dispatch(DataSlice.actions.setLPCR(parseInt(value)))} value={Data.LPCR===null ? "-2" : Data.LPCR.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">WBC</span>
                        <RadioButton name="WBC" onUpdate={(value) => dispatch(DataSlice.actions.setWBC(parseInt(value)))} value={Data.WBC===null ? "-2" : Data.WBC.toString()} options={analizeOpt} size="xl"/>
                    </div>

                </div>

                <div className="admin-container__col">

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">HGB</span>
                        <RadioButton name="HGB" onUpdate={(value) => dispatch(DataSlice.actions.setHGB(parseInt(value)))} value={Data.HGB===null ? "-2" : Data.HGB.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MCH</span>
                        <RadioButton name="MCH" onUpdate={(value) => dispatch(DataSlice.actions.setMCH(parseInt(value)))} value={Data.MCH===null ? "-2" : Data.MCH.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MCHC</span>
                        <RadioButton name="MCHC" onUpdate={(value) => dispatch(DataSlice.actions.setMCHC(parseInt(value)))} value={Data.MCHC===null ? "-2" : Data.MCHC.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">LYM</span>
                        <RadioButton name="LYM" onUpdate={(value) => dispatch(DataSlice.actions.setLYM(parseInt(value)))} value={Data.LYM===null ? "-2" : Data.LYM.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">GRAN</span>
                        <RadioButton name="GRAN" onUpdate={(value) => dispatch(DataSlice.actions.setGRAN(parseInt(value)))} value={Data.GRAN===null ? "-2" : Data.GRAN.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MID</span>
                        <RadioButton name="MID" onUpdate={(value) => dispatch(DataSlice.actions.setMID(parseInt(value)))} value={Data.MID===null ? "-2" : Data.MID.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">LIM%</span>
                        <RadioButton name="LIMP" onUpdate={(value) => dispatch(DataSlice.actions.setLIMProcent(parseInt(value)))} value={Data.LIMProcent===null ? "-2" : Data.LIMProcent.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">GRAN%</span>
                        <RadioButton name="GRANP" onUpdate={(value) => dispatch(DataSlice.actions.setGRAProcent(parseInt(value)))} value={Data.GRAProcent===null ? "-2" : Data.GRAProcent.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MID%</span>
                        <RadioButton name="MIDP" onUpdate={(value) => dispatch(DataSlice.actions.setMIDProcent(parseInt(value)))} value={Data.MIDProcent===null ? "-2" : Data.MIDProcent.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">NEUT</span>
                        <RadioButton name="NEUT" onUpdate={(value) => dispatch(DataSlice.actions.setNEUT(parseInt(value)))} value={Data.NEUT===null ? "-2" : Data.NEUT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">BO</span>
                        <RadioButton name="BO" onUpdate={(value) => dispatch(DataSlice.actions.setBO(parseInt(value)))} value={Data.BO===null ? "-2" : Data.BO.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">BASO</span>
                        <RadioButton name="BASO" onUpdate={(value) => dispatch(DataSlice.actions.setBASO(parseInt(value)))} value={Data.BASO===null ? "-2" : Data.BASO.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MON</span>
                        <RadioButton name="MON" onUpdate={(value) => dispatch(DataSlice.actions.setMON(parseInt(value)))} value={Data.MON===null ? "-2" : Data.MON.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">УЗИ</span>
                        <RadioButton name="UltraSound" onUpdate={(value) => dispatch(DataSlice.actions.setUltrasound(parseInt(value)))} value={Data.Ultrasound===null ? "-2" : Data.Ultrasound.toString()} options={ultrasoundOpt} size="xl"/>
                    </div>

                    <Button onClick={() => apply(Data)} width="auto" view="action" size="xl" className="admin-container__opt admin-container__but">
                            Сохранить<Icon data={CirclePlus}/>
                    </Button>
                </div>

            </div>
        </>
    )
}

export default DataChange;