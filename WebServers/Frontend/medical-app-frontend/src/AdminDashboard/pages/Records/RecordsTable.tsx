import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useTheme} from "../../../hooks/getTheme.ts";
import {useNavigate} from "react-router-dom";
import { Pagination, PaginationProps, Table, withTableActions} from "@gravity-ui/uikit";
import {fetchAllData} from "../../../api/Analyz.api.ts";

function UserTable(){
    const dispatch = useAppDispatch()

    const [update, setUpdate] = useState<boolean>(false)
    const [pagination, setPagination] = useState({page: 1, pageSize: 50})

    const theme = useTheme()

    const navigate = useNavigate();

    const DashboardTable = withTableActions(Table);

    useEffect(() => {
        fetchAllData(dispatch, pagination.page,pagination.pageSize)
    },[])

    const getRowId = 'id';

    const handlePagination: PaginationProps['onUpdate'] = (page,pageSize) => {
        setPagination((prevState) => ({...prevState, page, pageSize}))
        setUpdate(!update)
    }
    const {Tables, ColumnsName, count} = useAppSelector(state => state.AnalyzTableReducer)

    const getRowActions:(item: any) => [{ handler: () => void; text: string }] = (item: any) => {
        return [
            {
                text: 'Открыть', handler: () => {
                    navigate("../../analyz/record/"+item.id)
                }
            },

        ];
    }

    return(
        <>

            <div className="admin-container flex-col">
                <div className={"admin-container-table" + " " + theme}>
                    <DashboardTable
                        data={Tables}
                        columns={ColumnsName}
                        getRowId={getRowId}
                        getRowActions={getRowActions}
                        rowActionsSize="xl"
                    />

                </div>
                <Pagination className="admin-container-pagination" pageSizeOptions={[25,50,100]} compact={true} showInput={true} page={pagination.page} pageSize={pagination.pageSize} total={count} onUpdate={handlePagination}/>
            </div>
        </>
    )

}

export default UserTable
