import {Button, Icon, Label, Modal, RadioButton, Switch, TextInput, useToaster} from "@gravity-ui/uikit";
import {analizeOpt, genderOpt, metastasaOpt, ultrasoundOpt} from "../../AdminDashboard/utils/DataRadioConst.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowRightFromSquare, ArrowShapeUpFromLine} from "@gravity-ui/icons";
import {useEffect, useState} from "react";
import {AnalyzSlice} from "../../store/slice/AnalyzSlice.ts";
import {IAnalyz} from "../../store/models/IAnalyz.ts";
import {createAnalyz, fetchOneById, predicate} from "../../api/Analyz.api.ts";
import {CircleLoader} from "react-spinners";



function AnalyzViewer(){

    type dataId = {
        id: string;
    };

    const [isDone, setIsDone] = useState<boolean>(false)

    const id = useParams<dataId>()

    const dispatch = useAppDispatch()

    const {add} = useToaster()

    const navigate = useNavigate();

    interface Cond {
        [key: number]: string
    }
    interface condTheme {
        [key: number]: "danger" | "warning" | "success" | "unknown" | "info" | "normal" | "clear" | undefined
    }

    const conditionLabel:Cond = {
        0: "До 1 года.",
        1: "От 1 до 5 лет.",
        2: "От 5 до 10 лет.",
        3: "От 10 лет.",
        4: "В процессе обработки."
    }

    const conditionTheme:condTheme = {
        0: "danger",
        1: "danger",
        2: "warning",
        3: "success",
        4: "unknown"
    }

    const {Data, isLoading} = useAppSelector(state => state.AnalyzReducer)
    const [isProgress, setProgress] = useState<boolean>(false)
    const [isProgressModal, setProgressModal] = useState<boolean>(false)


    const [cardioVal, setCardioVal] = useState<boolean>(false)
    const [geniVal, setGeniVal] = useState<boolean>(false)
    const [gastrVal, setGastrVal] = useState<boolean>(false)
    const [angiopathyVal, setAngiopathyVal] = useState<boolean>(false)
    const [tumorsVal, setTumorsVal] = useState<boolean>(false)


    if(id.id!=null){
        useEffect(()=>{
            fetchOneById(dispatch, id.id)

        },[])
        useEffect(() => {
            setIsDone(true)
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
            }
            if(Data.createdAt !== undefined){
                setTimestamp(new Date(Data.createdAt))
            }

            },[isLoading])}
    else{
        useEffect(() => {
            dispatch(AnalyzSlice.actions.resetState())
        }, []);

    }





    function changeCardio(value: boolean){
        setCardioVal(value);
        if(value){
            dispatch(AnalyzSlice.actions.setCardio(1))
        }
        else{
            dispatch(AnalyzSlice.actions.setCardio(0))
        }
    }

    function changeGeni(value: boolean){
        setGeniVal(value)
        if(value){
            dispatch(AnalyzSlice.actions.setGeni(1))
        }
        else{
            dispatch(AnalyzSlice.actions.setGeni(0))
        }
    }

    function changeGastr(value: boolean){
        setGastrVal(value)
        if(value){
            dispatch(AnalyzSlice.actions.setGastr(1))
        }
        else{
            dispatch(AnalyzSlice.actions.setGastr(0))
        }
    }

    function changeAngiopathy(value: boolean){
        setAngiopathyVal(value)
        if(value){
            dispatch(AnalyzSlice.actions.setAnigopathy(1))
        }
        else{
            dispatch(AnalyzSlice.actions.setAnigopathy(0))
        }
    }

    function changeTumors(value: boolean){
        setTumorsVal(value)
        if(value){
            dispatch(AnalyzSlice.actions.setTumors(1))
        }
        else{
            dispatch(AnalyzSlice.actions.setTumors(0))
        }
    }

    function apply(data: IAnalyz){

        if(id.id!=null){
        }
        else{
            setProgress(true)
            setProgressModal(true)
            predicate(data).then((answer) => {

                if(answer && typeof answer.data === "number"){
                    const newAnalyz: IAnalyz = {...data, answer:answer.data}
                    createAnalyz(newAnalyz).then((data)=>{
                        if(data !== undefined){
                            if (data.data !== undefined){
                                console.log(data.data.answer);
                                dispatch(AnalyzSlice.actions.setAnswer(data.data.answer))
                            }
                        }
                        }).finally(() =>{
                        setProgress(false)
                    })
                }

            });
            add({
                name: "cluster-edit",
                title: "Анализ добавлен на обработку",
                autoHiding: 2000,
                type: "success"
            });
        }

        //navigate("../");
    }

    const [time_stamp, setTimestamp] = useState<Date>(new Date)


    return(
        <div className={"admin"}>{
            isDone ?
                <div className={"analizViewer_text"}>
                    <div className={"analizViewer_text-con"}>
                        <span>{Data.lastname} {Data.firstname} {Data.middlename}</span>
                        <span className="analizViewer_text-con-last">{time_stamp.toLocaleDateString('ru-RU')}</span>
                    </div>
                    <Label theme={conditionTheme[Data.answer]} size={"m"}>{conditionLabel[Data.answer]}</Label>
                </div>
                :

                <div className={"analizViewer_text"}>Новый анализ</div>
        }

            <div className="admin-container">

                <div className="admin-container__col">
                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Фамилия</span>
                        <TextInput disabled={isDone} name="lastname" onUpdate={(value) => dispatch(AnalyzSlice.actions.setLastname(value))} value={Data.lastname} size="xl"/>
                    </div>
                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Имя</span>
                        <TextInput disabled={isDone} name="firstname" onUpdate={(value) => dispatch(AnalyzSlice.actions.setFirstname(value))} value={Data.firstname} size="xl"/>
                    </div>
                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Отчество</span>
                        <TextInput disabled={isDone} name="middlename" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMiddlename(value))} value={Data.middlename} size="xl"/>
                    </div>


                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Пол</span>
                        <RadioButton disabled={isDone} name="gender" onUpdate={(value) => dispatch(AnalyzSlice.actions.setGender(value === "-2"? null : parseInt(value)))} value={Data.gender===null ? "-2" : Data.gender.toString()} options={genderOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Гормональный фон</span>
                        <RadioButton disabled={isDone} name="hormon" onUpdate={(value) => dispatch(AnalyzSlice.actions.setHormonalBackground(value === "-2"? null : parseInt(value)))} value={Data.hormonalBackground===null ? "-2" : Data.hormonalBackground.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__switch">
                    <span className="admin-container__switch-text">
                        Сопутсвующие заболевания
                    </span>

                        <Switch disabled={isDone} className="admin-container__switch-opt" size="l" checked={cardioVal} onUpdate={(event) => changeCardio(event)}>Сердечно сосудистая система</Switch>

                        <Switch disabled={isDone} className="admin-container__switch-opt" size="l" checked={geniVal} onUpdate={(event) => changeGeni(event)}>Мочеполовая система</Switch>

                        <Switch disabled={isDone} className="admin-container__switch-opt" size="l" checked={gastrVal} onUpdate={(event) => changeGastr(event)}>Желудочно кишечный тракт</Switch>

                        <Switch disabled={isDone} className="admin-container__switch-opt" size="l" checked={angiopathyVal} onUpdate={(event) => changeAngiopathy(event)}>Ангиопатия</Switch>

                        <Switch disabled={isDone} className="admin-container__switch-opt" size="l" checked={tumorsVal} onUpdate={(event) => changeTumors(event)}>Опухоли другой локализации</Switch>
                    </div>


                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">RBC</span>
                        <RadioButton disabled={isDone} name="RBC" onUpdate={(value) => dispatch(AnalyzSlice.actions.setRBC(value === "-2"? null : parseInt(value)))} value={Data.RBC===null ? "-2" : Data.RBC.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MCV</span>
                        <RadioButton disabled={isDone} name="MCV" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMCV(value === "-2"? null : parseInt(value)))} value={Data.MCV===null ? "-2" : Data.MCV.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">RDW</span>
                        <RadioButton disabled={isDone} name="RDW" onUpdate={(value) => dispatch(AnalyzSlice.actions.setRDW(value === "-2"? null : parseInt(value)))} value={Data.RDW===null ? "-2" : Data.RDW.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">RDWa</span>
                        <RadioButton disabled={isDone} name="RDWa" onUpdate={(value) => dispatch(AnalyzSlice.actions.setRDWa(value === "-2"? null : parseInt(value)))} value={Data.RDWa===null ? "-2" : Data.RDWa.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">HCT</span>
                        <RadioButton disabled={isDone} name="HCT" onUpdate={(value) => dispatch(AnalyzSlice.actions.setHCT(value === "-2"? null : parseInt(value)))} value={Data.HCT===null ? "-2" : Data.HCT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">PLT</span>
                        <RadioButton disabled={isDone} name="PLT" onUpdate={(value) => dispatch(AnalyzSlice.actions.setPLT(value === "-2"? null : parseInt(value)))} value={Data.PLT===null ? "-2" : Data.PLT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MPV</span>
                        <RadioButton disabled={isDone} name="MPV" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMPV(value === "-2"? null : parseInt(value)))} value={Data.MPV===null ? "-2" : Data.MPV.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">PDW</span>
                        <RadioButton disabled={isDone} name="PDW" onUpdate={(value) => dispatch(AnalyzSlice.actions.setPDW(value === "-2"? null : parseInt(value)))} value={Data.PDW===null ? "-2" : Data.PDW.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">PCT</span>
                        <RadioButton disabled={isDone} name="PCT" onUpdate={(value) => dispatch(AnalyzSlice.actions.setPCT(value === "-2"? null : parseInt(value)))} value={Data.PCT===null ? "-2" : Data.PCT.toString()} options={analizeOpt} size="xl"/>
                    </div>



                </div>

                <div className="admin-container__col">
                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">LPCR</span>
                        <RadioButton disabled={isDone} name="LPCR" onUpdate={(value) => dispatch(AnalyzSlice.actions.setLPCR(value === "-2"? null : parseInt(value)))} value={Data.LPCR===null ? "-2" : Data.LPCR.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">WBC</span>
                        <RadioButton disabled={isDone} name="WBC" onUpdate={(value) => dispatch(AnalyzSlice.actions.setWBC(value === "-2"? null : parseInt(value)))} value={Data.WBC===null ? "-2" : Data.WBC.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">HGB</span>
                        <RadioButton disabled={isDone} name="HGB" onUpdate={(value) => dispatch(AnalyzSlice.actions.setHGB(value === "-2"? null : parseInt(value)))} value={Data.HGB===null ? "-2" : Data.HGB.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MCH</span>
                        <RadioButton disabled={isDone} name="MCH" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMCH(value === "-2"? null : parseInt(value)))} value={Data.MCH===null ? "-2" : Data.MCH.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MCHC</span>
                        <RadioButton disabled={isDone} name="MCHC" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMCHC(value === "-2"? null : parseInt(value)))} value={Data.MCHC===null ? "-2" : Data.MCHC.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">LYM</span>
                        <RadioButton disabled={isDone} name="LYM" onUpdate={(value) => dispatch(AnalyzSlice.actions.setLYM(value === "-2"? null : parseInt(value)))} value={Data.LYM===null ? "-2" : Data.LYM.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">GRAN</span>
                        <RadioButton disabled={isDone} name="GRAN" onUpdate={(value) => dispatch(AnalyzSlice.actions.setGRAN(value === "-2"? null : parseInt(value)))} value={Data.GRAN===null ? "-2" : Data.GRAN.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MID</span>
                        <RadioButton disabled={isDone} name="MID" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMID(value === "-2"? null : parseInt(value)))} value={Data.MID===null ? "-2" : Data.MID.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">LIM%</span>
                        <RadioButton disabled={isDone} name="LIMP" onUpdate={(value) => dispatch(AnalyzSlice.actions.setLIMProcent(value === "-2"? null : parseInt(value)))} value={Data.LIMProcent===null ? "-2" : Data.LIMProcent.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">GRAN%</span>
                        <RadioButton disabled={isDone} name="GRANP" onUpdate={(value) => dispatch(AnalyzSlice.actions.setGRAProcent(value === "-2"? null : parseInt(value)))} value={Data.GRAProcent===null ? "-2" : Data.GRAProcent.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MID%</span>
                        <RadioButton disabled={isDone} name="MIDP" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMIDProcent(value === "-2"? null : parseInt(value)))} value={Data.MIDProcent===null ? "-2" : Data.MIDProcent.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">NEUT</span>
                        <RadioButton disabled={isDone} name="NEUT" onUpdate={(value) => dispatch(AnalyzSlice.actions.setNEUT(value === "-2"? null : parseInt(value)))} value={Data.NEUT===null ? "-2" : Data.NEUT.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">BO</span>
                        <RadioButton disabled={isDone} name="BO" onUpdate={(value) => dispatch(AnalyzSlice.actions.setBO(value === "-2"? null : parseInt(value)))} value={Data.BO===null ? "-2" : Data.BO.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">BASO</span>
                        <RadioButton disabled={isDone} name="BASO" onUpdate={(value) => dispatch(AnalyzSlice.actions.setBASO(value === "-2"? null : parseInt(value)))} value={Data.BASO===null ? "-2" : Data.BASO.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">MON</span>
                        <RadioButton disabled={isDone} name="MON" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMON(value === "-2"? null : parseInt(value)))} value={Data.MON===null ? "-2" : Data.MON.toString()} options={analizeOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">УЗИ</span>
                        <RadioButton disabled={isDone} name="UltraSound" onUpdate={(value) => dispatch(AnalyzSlice.actions.setUltrasound(value === "-2"? null : parseInt(value)))} value={Data.Ultrasound===null ? "-2" : Data.Ultrasound.toString()} options={ultrasoundOpt} size="xl"/>
                    </div>

                    <div className="admin-container__opt">
                        <span className="admin-container__opt-text">Метастазы</span>
                        <RadioButton disabled={isDone} name="metastasa" onUpdate={(value) => dispatch(AnalyzSlice.actions.setMetastasa(value === "-2"? null : parseInt(value)))} value={Data.metastasa===null ? "-2" : Data.metastasa.toString()} options={metastasaOpt} size="xl"/>
                    </div>
                    {
                        !isDone ?
                            <Button onClick={() => apply(Data)} width="auto" view="action" size="xl" className="admin-container__opt admin-container__but">
                                Отправить на анализ<Icon data={ArrowShapeUpFromLine}/>
                            </Button>
                            :
                            <Button onClick={() => navigate("../")} width="auto" view="action" size="xl" className="admin-container__opt admin-container__but">
                                Вернуться на главную<Icon data={ArrowRightFromSquare}/>
                            </Button>
                    }

                </div>

            </div>
            <Modal className="admin-modal" open={isProgressModal} onClose={() => {
                setProgressModal(false);
                navigate("../")
            }}>
                {
                    isProgress ?
                        <div className="admin-modal-container">
                            <div className="admin-modal-container-loader">
                                <CircleLoader size={100} color="#FFBE5C"/>
                            </div>
                        </div>
                        :

                        <div className="admin-modal-container">
                            <span>Результаты анализа</span>
                            <span className="admin-modal-container-accent__text">Группа риска:</span>
                            <Label theme={conditionTheme[Data.answer]} size="m">{conditionLabel[Data.answer]}</Label>
                            <Button onClick={() => navigate("../")} view="action" size="xl">Вернуться на главную</Button>
                        </div>
                }

            </Modal>
        </div>
    )
}

export default AnalyzViewer;