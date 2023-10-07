import {Card, Icon} from "@gravity-ui/uikit";
import {ArrowRightToSquare, DatabaseMagnifier, Persons, RectanglePulse} from "@gravity-ui/icons";
import {useTheme} from "../../hooks/getTheme.ts";


function AdminMenu(){

    const theme = useTheme()

    return(
            <div className={"admin-menu "}>
                <div className="admin-menu-container">
                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l">
                        <div>
                            <Icon size={50} data={DatabaseMagnifier}/>
                            <span>Данные Кластеризации</span>
                        </div>
                        <p>Работа с данными <br/> для кластеризации</p>
                    </Card>

                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l">
                        <div>
                            <Icon size={50} data={Persons}/>
                            <span>Настройка пользователей</span>
                        </div>
                        <p>Создание, редактирование<br/> удаление пользоателей</p>
                    </Card>

                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l">
                        <div>
                            <Icon size={50} data={RectanglePulse}/>
                            <span>Просмотр анализов</span>
                        </div>
                        <p>Работа с записями<br/> анализов пациентов</p>
                    </Card>

                    <Card className={"admin-menu-container__elem "  + theme} view="raised" type="container" size="l">
                        <div>
                            <Icon size={50} data={ArrowRightToSquare}/>
                            <span>Перейти в анализатор</span>
                        </div>
                        <p>Возвращения в режим<br/> оцени риска</p>
                    </Card>
                </div>
            </div>
    )
}

export default AdminMenu