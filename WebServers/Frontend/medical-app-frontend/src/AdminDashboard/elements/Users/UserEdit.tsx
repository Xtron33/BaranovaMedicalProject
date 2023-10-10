import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useTheme} from "../../../hooks/getTheme.ts";
import {useNavigate} from "react-router-dom";
import {Button, Icon, Table, withTableActions, withTableSelection} from "@gravity-ui/uikit";
import {CirclePlus, TrashBin} from "@gravity-ui/icons";
import {DeleteUserById, fetchUsers} from "../../api/Users.api.ts";

function UserEdit(){
    const [update, setUpdate] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const theme = useTheme()

    const navigate = useNavigate();

    const DashboardTable = (withTableSelection(withTableActions(Table)));


    const {Tables, ColumnsName} = useAppSelector(state => state.UserTabelReducer)

    useEffect(() => {
        fetchUsers(dispatch)
    },[update])


    const getRowActions:(item: any) => [{ handler: () => void; text: string }, {
        handler: () => void;
        theme: "danger" | "normal" | undefined;
        text: string
    }] = (item: any) => {
        return [
            {
                text: 'Изменить', handler: () => {
                    navigate("change/"+item.id)
                }
            },
            {
                text: 'Удалить', handler: () => {
                    DeleteUserById(item.id);
                    setUpdate(!update)
                }, theme: 'danger'
            },
        ];
    }

    const getRowId = 'id';
    const [selectedIds,setSelectedIds] = useState<Array<string>>([])

    function deleteSelect(){
        for(let elem of selectedIds){
            DeleteUserById(elem)
        }
        setUpdate(!update)
    }

    return(
        <>

            <div className="admin-container flex-col">
                <div className="admin-container-first-line">
                    <Button width="auto" view="action" size="xl" onClick={() => navigate("new")}>
                        Добавить нового пользователя<Icon data={CirclePlus}/>
                    </Button>
                    <Button className="admin-container-first-line__btn" width="auto" view="flat-danger" size="xl" onClick={() => deleteSelect()}>
                        Удалить<Icon data={TrashBin}/>
                    </Button>
                </div>

                <div className={"admin-container-table" + " " + theme}>
                    <DashboardTable
                        data={Tables}
                        columns={ColumnsName}
                        getRowId={getRowId}
                        selectedIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                        getRowActions={getRowActions}
                        rowActionsSize="xl"
                    />
                </div>

            </div>
        </>
    )

}

export default UserEdit
