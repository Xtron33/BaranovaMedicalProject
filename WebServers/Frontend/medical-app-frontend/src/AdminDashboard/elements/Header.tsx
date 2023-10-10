import {Button, DropdownMenu, Icon, PopupProps, Switch} from "@gravity-ui/uikit";
import {ArrowRightFromSquare, Bars, DatabaseMagnifier, Moon, Persons, Sun} from "@gravity-ui/icons";
import {useEmail} from "../../hooks/useEmail.ts";
import {useState} from "react";
import {useTheme} from "../../hooks/getTheme.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {UserSlice} from "../../store/slice/UserSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";


function Header(){
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
        <div className={"admin-header " + theme}>
            <div className="admin-header-container">
                <div className="admin-header-container__theme-switch">
                    <div className="admin-header__theme-switch-icon" onClick={() => changeTheme(false)}>
                        <Icon size={25} data={Moon}/></div>
                            <Switch size="l"  checked={themeSwitch} onChange={() => changeTheme(!themeSwitch)}></Switch>
                    <div className="admin-header-container__theme-switch-icon" onClick={() => changeTheme(true)}><Icon size={25} data={Sun}/></div>
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
                        items={[
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
                                    icon: <Icon size={25} data={ArrowRightFromSquare} />,
                                    action: () => dispatch(UserSlice.actions.logout()),
                                    text: 'Выйти из пользователя',
                                    theme: 'danger',
                                },]
                        ]}
                    /> :
                    <></>
                }

            </div>
        </div>
    )
}

export default Header