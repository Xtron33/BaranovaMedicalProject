import {Button, Icon, TextInput, useToaster} from "@gravity-ui/uikit";
import {ArrowRightToSquare} from "@gravity-ui/icons";
import {AuthApi} from "../api/auth.api.ts";
import {useState} from "react";
import {setTokenToLocalStorage} from "../helpers/localstorage.helper.ts";
import {UserSlice} from "../store/slice/UserSlice.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useRole} from "../hooks/useRole.ts";
import {useTheme} from "../hooks/getTheme.ts";


function LoginPage(){

    const dispatch = useAppDispatch()

    const isAuth:boolean = useAuth()
    const role:string = useRole()
    const theme = useTheme()
    const {add} = useToaster()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()
    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            const data = await AuthApi.login({email, password})
            if(data){
                setTokenToLocalStorage('token', data.token)
                dispatch(UserSlice.actions.login(data))

                add({
                        name: "login",
                        title: "Успешный вход",
                        autoHiding: 2000,
                        type: "success"
                    });
                navigate('./analyz')
            }
        }
        catch (err:any){

                add({
                    name: "login",
                    title: "Не удалось войти в систему",
                    content: "Проверьте почту и пароль",
                    autoHiding: 2000,
                    type: "error"
                })

        }
    }




    return(
        <>
            {isAuth && role ==="admin" || role==="super-admin" ? <Navigate to={"./analyz"} replace/> :
                <>
                    <div className={"admin-container__login"  + " " + theme}>

                        {                role !== "admin" && role !== " " ?

                            <div className="not-right"> Недостаточно прав для доступа к административной панели</div>
                            :

                            <form onSubmit={loginHandler}>
                                <div className={"admin-container__login-cont"}>
                                    <TextInput onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoFocus={true} size="xl" placeholder="example@mail.ru" label="Email"/>
                                    <TextInput onChange={(e) => setPassword(e.target.value)} value={password} type="password" size="xl" placeholder="Very secret pass" label="Password"/>
                                    <Button type="submit" width="max" view="action" size="xl">
                                        Войти<Icon data={ArrowRightToSquare}/>
                                    </Button>
                                </div>
                            </form>
                        }


                    </div>
                </>
            }



        </>
    )
}

export default LoginPage;