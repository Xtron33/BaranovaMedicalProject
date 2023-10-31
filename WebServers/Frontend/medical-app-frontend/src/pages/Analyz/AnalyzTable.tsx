import {Button, Icon, Pagination, PaginationProps} from "@gravity-ui/uikit";
import {useTheme} from "../../hooks/getTheme.ts";
import {useNavigate} from "react-router-dom";
import {CirclePlus} from "@gravity-ui/icons";
import {useEffect, useState} from "react";
import {fetchAllUser} from "../../api/Analyz.api.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import AnalyzTableItem from "../../elements/AnalyzTableItem.tsx";


function AnalyzTable(){

    const theme = useTheme()
    const dispatch = useAppDispatch()


    const [pagination, setPagination] = useState({page: 1, pageSize: 6})
    const [update, setUpdate] = useState<boolean>(false)
    const handlePagination: PaginationProps['onUpdate'] = (page,pageSize) => {
        setPagination((prevState) => ({...prevState, page, pageSize}))
        setUpdate(!update)
    }

    useEffect(() => {
        fetchAllUser(dispatch, pagination.page, pagination.pageSize)
    }, [update]);

    const navigate = useNavigate()

    const {Tables, count} = useAppSelector(state => state.AnalyzTableReducer)

    return(
        <>
            <div className="analyz-container">
                <div className="analyz-container-first-line">
                    <span className={"analyz-container-first-line__text"}>История анализов</span>
                    <Button width="auto" view="action" size="xl" onClick={() => navigate("new")}>
                        Создать новый анализ <Icon data={CirclePlus}/>
                    </Button>
                </div>
                {Tables.map((elem) => <AnalyzTableItem key={elem.id} item={elem} theme={theme}/>)}
                <Pagination className="admin-container-pagination" pageSizeOptions={[6,12,24]} compact={true} showInput={true} page={pagination.page} pageSize={pagination.pageSize} total={count} onUpdate={handlePagination}/>
            </div>
        </>
    )
}

export default AnalyzTable