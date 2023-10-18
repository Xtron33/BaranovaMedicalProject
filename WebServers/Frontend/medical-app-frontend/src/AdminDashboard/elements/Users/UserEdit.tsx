import {Button, Checkbox, Icon, Modal, RadioButton, TextInput, useToaster} from "@gravity-ui/uikit";
import {roleOpt, roleOptCut} from "../../utils/UserRadioConst.ts";
import {CirclePlus, TrashBin} from "@gravity-ui/icons";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useEffect, useRef, useState} from "react";
import {createSuperUser, createUser, DeleteUserById, fetchUser, updateUserById} from "../../api/Users.api.ts";
import {UserEditSlice} from "../../store/slice/UserEditSlice.ts";
import {IUser} from "../../store/models/IUser.ts";
import {useRole} from "../../../hooks/useRole.ts";


function UserEdit(){
    type id = {
        id: string;
    };

    const id = useParams<id>()

    const {add} = useToaster()

    const role = useRole()

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const {Data} = useAppSelector(state => state.UserEditReducer)

    const [isCheckedPassword, setIsCheckedPassword] = useState<boolean>(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const isEmailValid = useRef<boolean>(true)
    const isPasswordValid = useRef<boolean>(true)

    useEffect(() => {
        if(id.id===undefined){
            dispatch(UserEditSlice.actions.resetState())
        }
    }, []);


    function validationEmailHandler(value:string){
        const validEmail:RegExp = new RegExp('^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return !validEmail.test(value)

    }
    function validationPasswordHandler(value:string | undefined){
        if(value!==undefined){
        const validPassword:RegExp = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')
        return !validPassword.test(value)
        }
        else{
            return true
        }

    }

    function apply(data: IUser){

        isEmailValid.current = !validationEmailHandler(data.email);

        if(isCheckedPassword || id.id === undefined){
            isPasswordValid.current = !validationPasswordHandler(data.password);
        }


        if(isEmailValid.current && isPasswordValid.current){
            if(id.id===undefined){

                add({
                    name: "user-edit",
                    title: "Пользователь добавлен",
                    autoHiding: 2000,
                    type: "success"
                });

                if(role==="super-admin"){
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
                add({
                    name: "user-edit",
                    title: "Пользователь обновлен",
                    autoHiding: 2000,
                    type: "success"
                });
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
        else{
            add({
                name: "user-edit",
                title: "Проверьте введеные данные",
                autoHiding: 2000,
                type: "error"
            });
        }



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
                            <TextInput validationState={isEmailValid.current ? undefined : "invalid"} errorMessage="Введен не корректный E-mail" onUpdate={(value) => dispatch(UserEditSlice.actions.setEmail(value))} autoFocus={true} value={Data.email} placeholder="example@medical.com" size={"xl"}/>
                        </div>
                        {id.id !== undefined ?
                            <div className="admin-container__opt">
                                <Checkbox size="l" onUpdate={() => setIsCheckedPassword(!isCheckedPassword)} checked={isCheckedPassword}>Изменить пароль?</Checkbox>
                            </div>
                            :
                            <></>
                        }

                        {isCheckedPassword || id.id === undefined ?
                            <div className="admin-container__opt">
                                <span className="admin-container__opt-text">Пароль</span>
                                <TextInput validationState={isPasswordValid.current ? undefined : "invalid"} errorMessage="Пароль должен содержать не менее 6 символов и состоять из заглавных, строчных латинские буквы и цифр" onUpdate={(value) => dispatch(UserEditSlice.actions.setPassword(value))} placeholder="*******" size={"xl"}/>
                            </div>

                            :
                            <></>

                        }

                        <div className="admin-container__opt">
                            <span className="admin-container__opt-text">Роль</span>
                            <RadioButton name="role" onUpdate={(value) => dispatch(UserEditSlice.actions.setRole(value))} value={Data.role} options={role==="super-admin" ? roleOpt : roleOptCut} size="xl"/>
                        </div>
                        <Button onClick={() => apply(Data)} width="auto" view="action" size="xl" className="admin-container__opt admin-container__but">
                            Сохранить<Icon data={CirclePlus}/>
                        </Button>

                        {
                            id.id !== undefined ?
                            <Button onClick={() => setIsDeleteOpen(true)}  width="auto" view="outlined-danger" size="xl" className="admin-container__opt admin-container__but">
                                Удалить пользователя<Icon data={TrashBin}/>
                            </Button> : <></>
                        }
                    </div>
            </div>
            <Modal className="admin-modal" open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <div className="admin-modal-container">
                    <span>Вы собираетесь удалить пользователя:</span>
                    <span className="admin-modal-container-accent__text">{Data.email}</span>
                    <Button onClick={() => {DeleteUserById(id.id); navigate("../")}} view="flat-danger" size="l">Да, я уверен</Button>
                    <Button onClick={() => setIsDeleteOpen(false)} view="action" size="xl">Нет, я не уверен</Button>
                </div>
            </Modal>
        </>
    )
}

export default UserEdit