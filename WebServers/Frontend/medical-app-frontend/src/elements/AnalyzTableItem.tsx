import {IAnalyz} from "../store/models/IAnalyz.ts";
import {Card, Label} from "@gravity-ui/uikit";
import {useNavigate} from "react-router-dom";

function AnalyzTableItem(props : {item: IAnalyz, theme: string}){
    const navigate = useNavigate();


    interface Cond {
        [key: number]: string
    }
    interface condTheme {
        [key: number]: "danger" | "warning" | "success" | "unknown" | "info" | "normal" | "clear" | undefined
    }

    const condition:Cond = {
        0: "bad",
        1: "bad",
        2: "soso",
        3: "good",
        4: "waiting"
    }
    const theme:condTheme = {
        0: "danger",
        1: "danger",
        2: "warning",
        3: "success",
        4: "unknown"
    }

    const conditionLabel:Cond = {
        0: "До 1 года.",
        1: "От 1 до 5 лет.",
        2: "От 5 до 10 лет.",
        3: "От 10 лет.",
        4: "В процессе обработки."
    }

    return(
        <>
            <Card className={"analyz-container__elem "  + props.theme} view="raised" type="container" size="l" >
                <div className={"analyz-container__elem-container"} onClick={() => navigate("./records")}>
                    <span className={"analyz-container__elem-container__text"}>{props.item.lastname}_{props.item.firstname}_{props.item.middlename}_{props.item.createdAt}</span>
                    <Label className={"analyz-container__elem-container__label-"+condition[props.item.answer ? props.item.answer : 4]} size={"m"} theme={theme[props.item.answer ? props.item.answer : 4]}>{conditionLabel[props.item.answer]}</Label>
                </div>
            </Card>
        </>
    )
}

export default AnalyzTableItem
