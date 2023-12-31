import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useTheme} from "../../../hooks/getTheme.ts";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Icon,
    Modal,
    Pagination,
    PaginationProps,
    Table,
    withTableActions,
    withTableSelection
} from "@gravity-ui/uikit";
import {CirclePlus, TrashBin} from "@gravity-ui/icons";
import {DeleteUserById, fetchUsersPag} from "../../api/Users.api.ts";
import {useRole} from "../../../hooks/useRole.ts";

function UserTable(){
    const [update, setUpdate] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const theme = useTheme()

    const role = useRole()

    const isSuperAdmin = useRef<boolean>(role !== "super-admin")

    const navigate = useNavigate();

    const DashboardTable = (withTableSelection(withTableActions(Table)));

    const [deleteItem, setDeleteItem] = useState<any>({})

    const [isManyDeleteOpen, setIsManyDeleteOpen] = useState<boolean>(false)

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)

    const {Tables, ColumnsName, count} = useAppSelector(state => state.UserTabelReducer)



    function deletElem(item: { id: string | undefined; }):void{
        DeleteUserById(item.id);
        setUpdate(!update)
    }

    const [pagination, setPagination] = useState({page: 1, pageSize: 50})
    const handlePagination: PaginationProps['onUpdate'] = (page,pageSize) => {
        setPagination((prevState) => ({...prevState, page, pageSize}))
        setUpdate(!update)
    }

    useEffect(() => {
        fetchUsersPag(dispatch,pagination.page,pagination.pageSize)
    },[update])
    const getRowActions:(item: any) => [{ handler: () => void; text: string }, {
        handler: () => void;
        theme: "danger" | "normal" | undefined;
        text: string
    }] = (item: any) => {
        return [
            {
                disabled: item.role !== "user" && isSuperAdmin.current,
                text: 'Изменить', handler: () => {
                    navigate("change/"+item.id)
                }
            },
            {
                disabled: item.role !== "user" && isSuperAdmin.current,
                text: 'Удалить', handler: () => {
                    setDeleteItem(item)
                    setIsDeleteOpen(true)
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
        setIsManyDeleteOpen(false)
    }

    function selectHandler(ids: string[]){

        let new_select_id: string[] = []
        for (const id of ids){
            let new_sel = Tables.find((el) => el.id !== undefined && el.id === parseInt(id))

            if(role === "super-admin" || (role === "admin" && new_sel !==undefined && new_sel.role !== "admin" && new_sel.role !== "super-admin")){
                new_select_id.push(id)
            }
        }
        setSelectedIds(new_select_id)
    }

    return(
        <>
            <div className="admin-container flex-col">
                <div className="admin-container-first-line">
                    <Button width="auto" view="action" size="xl" onClick={() => navigate("new")}>
                        Добавить нового пользователя<Icon data={CirclePlus}/>
                    </Button>
                    <Button className="admin-container-first-line__btn" width="auto" view="flat-danger" size="xl" onClick={() => setIsManyDeleteOpen(true)}>
                        Удалить<Icon data={TrashBin}/>
                    </Button>
                </div>

                <div className={"admin-container-table" + " " + theme}>
                    <DashboardTable
                        data={Tables}
                        columns={ColumnsName}
                        getRowId={getRowId}
                        selectedIds={selectedIds}
                        onSelectionChange={selectHandler}
                        getRowActions={getRowActions}
                        rowActionsSize="xl"
                    />
                </div>
                <Pagination className="admin-container-pagination" pageSizeOptions={[25,50,100]} compact={true} showInput={true} page={pagination.page} pageSize={pagination.pageSize} total={count} onUpdate={handlePagination}/>
                <Modal className="admin-modal" open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                    <div className="admin-modal-container">
                        <span>Вы собираетесь удалить пользователя. </span>
                        <span className="admin-modal-container-accent__text">{deleteItem.email} Вы уверены?</span>
                        <Button onClick={() => {deletElem(deleteItem); setIsDeleteOpen(false)}} view="flat-danger" size="l">Да, я уверен</Button>
                        <Button onClick={() => setIsDeleteOpen(false)} view="action" size="xl">Нет, я не уверен</Button>
                    </div>
                </Modal>
                <Modal className="admin-modal" open={isManyDeleteOpen} onClose={() => setIsManyDeleteOpen(false)}>
                    <div className="admin-modal-container">
                        <span>Вы собираетесь удалить {selectedIds.length} пользователей. </span>
                        <span className="admin-modal-container-accent__text">Вы уверены?</span>
                        <Button onClick={() => {deleteSelect()}} view="flat-danger" size="l">Да, я уверен</Button>
                        <Button onClick={() => setIsManyDeleteOpen(false)} view="action" size="xl">Нет, я не уверен</Button>
                    </div>
                </Modal>

            </div>
        </>
    )

}

export default UserTable
