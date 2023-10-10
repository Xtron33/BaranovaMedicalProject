import {Card, Icon} from "@gravity-ui/uikit";
import {ArrowRightToSquare, DatabaseMagnifier, Persons, RectanglePulse} from "@gravity-ui/icons";
import {useTheme} from "../../hooks/getTheme.ts";
import {useNavigate} from "react-router-dom";


function AdminMenu(){

    const theme = useTheme()

    const navigate = useNavigate();

    return(
            <div className={"admin-menu "}>
                <div className="admin-menu-container">
                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l" >
                        <div className={"admin-menu-container__elem-container"} onClick={() => navigate("../cluster")}>
                            <div>
                                <Icon size={50} data={DatabaseMagnifier}/>
                                <span>Данные Кластеризации</span>
                            </div>
                            <p>Работа с данными <br/> для кластеризации</p>
                        </div>
                    </Card>

                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l">
                        <div className={"admin-menu-container__elem-container"} onClick={() => navigate("../users")}>
                            <div>
                                <Icon size={50} data={Persons}/>
                                <span>Настройка пользователей</span>
                            </div>
                            <p>Создание, редактирование<br/> удаление пользоателей</p>
                        </div>
                    </Card>

                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l" >
                            <div className={"admin-menu-container__elem-container"} onClick={() => navigate("../records")}>
                                <div>
                                    <Icon size={50} data={RectanglePulse}/>
                                    <span>Просмотр анализов</span>
                                </div>
                                <p>Работа с записями<br/> анализов пациентов</p>
                            </div>
                    </Card>

                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l" >
                        <div className={"admin-menu-container__elem-container"} onClick={() => navigate("/../")}>
                            <div>
                                <Icon size={50} data={ArrowRightToSquare}/>
                                <span>Перейти в анализатор</span>
                            </div>
                            <p>Возвращения в режим<br/> оцени риска</p>
                        </div>
                    </Card>
                </div>
            </div>
    )
}

export default AdminMenu