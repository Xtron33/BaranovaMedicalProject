import {Button, Icon, TextInput} from "@gravity-ui/uikit";
import {ArrowRightToSquare} from "@gravity-ui/icons";


function LoginPage(){

    return(
        <div className="admin">


            <div className="admin-container__login">
                <div className="admin-container__login-cont">

                    <TextInput type="email" autoFocus={true} size="xl" placeholder="example@mail.ru" label="Email"/>
                    <TextInput type="password" size="xl" placeholder="Very secret pass" label="Password"/>
                    <Button width="max" view="action" size="xl">
                        Войти<Icon data={ArrowRightToSquare}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;