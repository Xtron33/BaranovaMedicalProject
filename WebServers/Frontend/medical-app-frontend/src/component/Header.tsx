import {Button, DropdownMenu, Icon, PopupProps, Switch} from "@gravity-ui/uikit";
import {
    ArrowRightFromSquare, ArrowShapeLeftFromLine,
    Bars,
    CrownDiamond,
    DatabaseMagnifier,
    House,
    Magnifier,
    Moon,
    Persons, RectanglePulse,
    Sun
} from "@gravity-ui/icons";
import {useEmail} from "../hooks/useEmail.ts";
import {useState} from "react";
import {useTheme} from "../hooks/getTheme.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {UserSlice} from "../store/slice/UserSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {useRole} from "../hooks/useRole.ts";


function Header(props: { isAdminPage: boolean }){

    const role = useRole()
    const dispatch = useAppDispatch()

    const Email = useEmail();
    const isAuth = useAuth()

    const navigate = useNavigate()

    const theme = useTheme()

    const [themeSwitch,setThemeSwitch] = useState<boolean>(theme === "light")

    const popup:PopupProps = {placement:"bottom-end", style:{marginTop: "15px"}}

    function changeTheme(theme:boolean){
        setThemeSwitch(theme)
        if(theme){
            dispatch(UserSlice.actions.changeTheme("light"))
        }
        else{
            dispatch(UserSlice.actions.changeTheme("dark"))
        }
    }

    return(
        <div className={"header " + theme}>
            <div className="header-container">
                <Button onClick={() => navigate('./')} className="header-container-home" view={"flat"}>
                    <Icon size={25} data={House}/>
                </Button>

                <div className="header-container__theme-switch">
                    <div className="header__theme-switch-icon" onClick={() => changeTheme(false)}>
                        <Icon size={25} data={Moon}/></div>
                            <Switch size="l"  checked={themeSwitch} onChange={() => changeTheme(!themeSwitch)}></Switch>
                    <div className="header-container__theme-switch-icon" onClick={() => changeTheme(true)}><Icon size={25} data={Sun}/></div>
                </div>

                {isAuth?

                    <DropdownMenu
                        popupProps={popup}
                        size="xl"
                        switcher={
                            <Button view="flat">
                                <Icon size={25} data={Bars} />
                            </Button>
                        }
                        items={
                        props.isAdminPage ?
                        [
                            [
                                {
                                    action: () => console.log(''),
                                    text: Email,
                                    disabled: true
                                }
                            ],
                            [
                                {
                                    icon: <Icon size={25} data={DatabaseMagnifier} />,
                                    action: () => navigate("./cluster"),
                                    text: 'Данные Кластеризации',
                                },
                                {
                                    icon: <Icon size={25} data={Persons} />,
                                    action: () => navigate("./users"),
                                    text: 'Пользователи',
                                },
                                {
                                    icon: <Icon size={25} data={RectanglePulse} />,
                                    action: () => navigate("./records"),
                                    text: 'Анализы',
                                }],
                            [
                                {
                                    icon: <Icon size={25} data={ArrowShapeLeftFromLine} />,
                                    action: () => navigate("/../"),
                                    text: 'Вернутся в анализатор',
                                },
                                {
                                    icon: <Icon size={25} data={ArrowRightFromSquare} />,
                                    action: () => dispatch(UserSlice.actions.logout()),
                                    text: 'Выйти из пользователя',
                                    theme: 'danger',
                                },
                            ]

                        ]
                        :
                            [
                                [
                                    {
                                        action: () => console.log(''),
                                        text: Email,
                                        disabled: true
                                    }
                                ],
                                {
                                    icon: <Icon size={25} data={Magnifier} />,
                                    action: () => navigate("../analyz"),
                                    text: 'Анализы',
                                },[

                                {
                                    hidden: !(role === "admin" || role === "super-admin"),
                                    icon: <Icon size={25} data={CrownDiamond} />,
                                    action: () => navigate("../admin"),
                                    text: 'Перейти в админ панель',

                                },
                                {
                                    icon: <Icon size={25} data={ArrowRightFromSquare} />,
                                    action: () => dispatch(UserSlice.actions.logout()),
                                    text: 'Выйти из пользователя',
                                    theme: 'danger',
                                },
                            ]
                                ]

                    }
                    /> :
                    <></>
                }

            </div>
        </div>
    )
}

export default Header