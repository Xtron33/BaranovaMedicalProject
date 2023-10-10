import {Button, Icon, RadioButton, TextInput} from "@gravity-ui/uikit";
import {roleOpt, roleOptCut} from "../../utils/UserRadioConst.ts";
import {CirclePlus} from "@gravity-ui/icons";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useEffect} from "react";
import {createSuperUser, createUser, fetchUser, updateUserById} from "../../api/Users.api.ts";
import {UserEditSlice} from "../../store/slice/UserEditSlice.ts";
import {IUser} from "../../store/models/IUser.ts";
import {useRole} from "../../../hooks/useRole.ts";


function ChangeUsers(){
    type id = {
        id: string;
    };

    const id = useParams<id>()

    console.log(id.id)

    const role = useRole()

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const {Data} = useAppSelector(state => state.UserEditReducer)


    useEffect(() => {
        if(id.id===undefined){
            dispatch(UserEditSlice.actions.resetState())
        }
    }, []);


    function apply(data: IUser){
        if(id.id===undefined){
            if(role==="super-admin"){
                console.log(data)
                createSuperUser(data)
            }
            else{
                    const newData:IUser = {
                        email: data.email,
                        password: data.password,
                        role: "user"
                }
                createUser(newData)

            }
        }
        else{
            if(data.password===""){
                const newData:IUser = {
                    email: data.email,
                    role: data.role
                }
                updateUserById(newData, id.id)
            }
            else{
                updateUserById(data, id.id)
            }
        }


        navigate("../")

    }

    if(id.id!=null){
        useEffect(()=>{
            fetchUser(dispatch, id.id).then().finally(()=>{
                dispatch(UserEditSlice.actions.setPassword(""))
            })


        },[])}
    else{
        useEffect(() => {
            dispatch(UserEditSlice.actions.resetState)
        }, []);

    }



    return(

        <>
            <div className="admin-container">
                    <div className="admin-container__col">
                        <div className="admin-container__opt">
                            <span className="admin-container__opt-text">Email</span>
                            <TextInput onUpdate={(value) => dispatch(UserEditSlice.actions.setEmail(value))} autoFocus={true} value={Data.email} placeholder="example@medical.com" size={"xl"}/>
                        </div>
                        <div className="admin-container__opt">
                            <span className="admin-container__opt-text">Новый пароль</span>
                            <TextInput onUpdate={(value) => dispatch(UserEditSlice.actions.setPassword(value))} placeholder="*******" size={"xl"}/>
                        </div>
                        <div className="admin-container__opt">
                            <span className="admin-container__opt-text">Роль</span>
                            <RadioButton name="role" onUpdate={(value) => dispatch(UserEditSlice.actions.setRole(value))} value={Data.role} options={role==="super-admin" ? roleOpt : roleOptCut} size="xl"/>
                        </div>
                        <Button onClick={() => apply(Data)} width="auto" view="action" size="xl" className="admin-container__opt admin-container__but">
                            Сохранить<Icon data={CirclePlus}/>
                        </Button>
                    </div>
            </div>
        </>
    )
}

export default ChangeUsers