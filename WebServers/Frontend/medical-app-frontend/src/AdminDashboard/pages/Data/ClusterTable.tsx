

import {
    Button,
    Icon,
    Modal, Pagination, PaginationProps,
    Progress,
    Table,
    TextInput,
    useToaster,
    withTableActions,
    withTableSelection
} from "@gravity-ui/uikit";
import {useEffect, useState} from "react";
import {DeleteDateById, fetchDataPagination} from "../../api/Data.api.ts";
import {CirclePlus, CloudArrowUpIn, TrashBin} from "@gravity-ui/icons";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useTheme} from "../../../hooks/getTheme.ts";
import {File} from '@gravity-ui/icons';
import {uploadData} from "../../api/File.api.ts";
import {UploadProgresSlice} from "../../store/slice/UploadProgresSlice.ts";
import {RingLoader} from "react-spinners";


function ClusterTable(){
    const [update, setUpdate] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const {add} = useToaster()

    const theme = useTheme()

    const navigate = useNavigate();

    const DashboardTable = (withTableSelection(withTableActions(Table)));

    const [deleteItem, setDeleteItem] = useState<any>({})
    const [isManyDeleteOpen, setIsManyDeleteOpen] = useState<boolean>(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)

    const [isImportOpen, setIsImportOpen] = useState<boolean>(false)

    const [file, setFile] = useState<File>()

    const [pagination, setPagination] = useState({page: 1, pageSize: 50})

    function deletElem(item: { id: string | undefined; }):void{
        DeleteDateById(item.id);
        setUpdate(!update)
    }

    const {Tables, ColumnsName, count} = useAppSelector(state => state.TableReducer)
    const {progress, isLoading} = useAppSelector(state => state.ProgressReducer)

    useEffect(() => {
        fetchDataPagination(dispatch, pagination.page, pagination.pageSize)
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
            DeleteDateById(elem)
        }
        setUpdate(!update)
        setIsManyDeleteOpen(false)
    }

    function hanndlerUpload(file:File | undefined){
        if(file){
            dispatch(UploadProgresSlice.actions.setIsLoading(true))
            let formData: FormData = new FormData()
            formData.append('file', file)
            uploadData(formData, dispatch).then().finally(() => {
                setUpdate(!update)
                dispatch(UploadProgresSlice.actions.setIsLoading(false))
                setIsImportOpen(false)
                add({
                    name: "import-file",
                    title: "Данные из файла были успешно импортированы",
                    autoHiding: 2000,
                    type: "success"
                });
            })

        }

    }


    const kostily:React.InputHTMLAttributes<HTMLInputElement> = {
        accept: ".xlsx"
    }

    const handlePagination: PaginationProps['onUpdate'] = (page,pageSize) => {
        setPagination((prevState) => ({...prevState, page, pageSize}))
        setUpdate(!update)
    }


    return(
        <>

            <div className="admin-container flex-col">
                <div className="admin-container-first-line">
                    <Button width="auto" view="action" size="xl" onClick={() => navigate("new")}>
                        Добавить новые данные<Icon data={CirclePlus}/>
                    </Button>
                    <Button className="admin-container-first-line__btn" width="auto" selected={true} view="outlined-success" size="xl" onClick={() => setIsImportOpen(true)}>
                        Импорт из Excel файла<Icon data={CloudArrowUpIn}/>
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
                        onSelectionChange={setSelectedIds}
                        getRowActions={getRowActions}
                        rowActionsSize="xl"
                    />
                </div>
                <Pagination className="admin-container-pagination" pageSizeOptions={[25,50,100]} compact={true} showInput={true} page={pagination.page} pageSize={pagination.pageSize} total={count} onUpdate={handlePagination}/>
                <Modal className="admin-modal" open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                    <div className="admin-modal-container">
                        <span>Вы собираетесь удалить запись. </span>
                        <span className="admin-modal-container-accent__text">{deleteItem.email} Вы уверены?</span>
                        <Button onClick={() => {deletElem(deleteItem); setIsDeleteOpen(false)}} view="flat-danger" size="l">Да, я уверен</Button>
                        <Button onClick={() => setIsDeleteOpen(false)} view="action" size="xl">Нет, я не уверен</Button>
                    </div>
                </Modal>
                <Modal className="admin-modal" open={isManyDeleteOpen} onClose={() => setIsManyDeleteOpen(false)}>
                    <div className="admin-modal-container">
                        <span>Вы собираетесь удалить {selectedIds.length} записей. </span>
                        <span className="admin-modal-container-accent__text">Вы уверены?</span>
                        <Button onClick={() => {deleteSelect()}} view="flat-danger" size="l">Да, я уверен</Button>
                        <Button onClick={() => setIsManyDeleteOpen(false)} view="action" size="xl">Нет, я не уверен</Button>
                    </div>
                </Modal>
                <Modal className="admin-modal" open={isImportOpen} onClose={() => setIsImportOpen(false)}>
                    {
                        isLoading ?
                            <div className="admin-modal-container">
                                <RingLoader size={110} color="#FFBE5C"/>
                                <Progress className="admin-modal-container-progress" theme="warning" value={progress} size="s" />
                            </div>
                            :

                            <div className="admin-modal-container">
                                <span>Выберите  файл из которого будут загружены данные</span>
                                <span className="admin-modal-container-accent__text">Файл:</span>
                                <TextInput onChange={(e) => {if(e.target.files!==null) setFile(e.target.files[0])}} leftContent={<File style={{marginLeft: "15px"}}/>} controlProps={kostily} className="admin-modal-container-file" type="file" size="xl" hasClear={true}/>
                                <Button disabled={!file} onClick={() => hanndlerUpload(file)} view="action" size="xl">Загузить</Button>
                            </div>
                    }

                </Modal>

            </div>
        </>
    )

}

export default ClusterTable