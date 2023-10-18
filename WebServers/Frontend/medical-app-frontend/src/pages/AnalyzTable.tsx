import {Button, Card, Icon, Label} from "@gravity-ui/uikit";
import {useTheme} from "../hooks/getTheme.ts";
import {useNavigate} from "react-router-dom";
import {CirclePlus} from "@gravity-ui/icons";


function AnalyzTable(){

    const theme = useTheme()

    const navigate = useNavigate()

    return(
        <>
            <div className="analyz-container">
                <div className="analyz-container-first-line">
                    <span className={"analyz-container-first-line__text"}>История анализов</span>
                    <Button width="auto" view="action" size="xl" onClick={() => navigate("new")}>
                        Создать новый анализ <Icon data={CirclePlus}/>
                    </Button>
                </div>
                <Card className={"analyz-container__elem "  + theme} view="raised" type="container" size="l" >
                    <div className={"analyz-container__elem-container"} onClick={() => navigate("./records")}>
                        <span className={"analyz-container__elem-container__text"}>Иванов_Иван_Иванович_07.09.2023</span>
                        <Label className={"analyz-container__elem-container__label-"+"good"} size={"m"} theme="success">Развитие в течение 10 лет</Label>
                    </div>
                </Card>
                <Card className={"analyz-container__elem "  + theme} view="raised" type="container" size="l" >
                    <div className={"analyz-container__elem-container"} onClick={() => navigate("./records")}>
                        <span className={"analyz-container__elem-container__text"}>Иванов_Иван_Иванович_07.09.2023</span>
                        <Label className={"analyz-container__elem-container__label-"+"soso"} size={"m"} theme="warning">Развитие в течение 5 лет</Label>
                    </div>
                </Card>
                <Card className={"analyz-container__elem "  + theme} view="raised" type="container" size="l" >
                    <div className={"analyz-container__elem-container"} onClick={() => navigate("./records")}>
                        <span className={"analyz-container__elem-container__text"}>Иванов_Иван_Иванович_07.09.2023</span>
                        <Label className={"analyz-container__elem-container__label-"+"bad"} size={"m"} theme="danger">Развитие в течение 1 лет</Label>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default AnalyzTable