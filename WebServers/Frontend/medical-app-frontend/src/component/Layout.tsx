import {FC} from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";



import "../styles/Page/AnalyzTable.scss"

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

const AdminLayout: FC = () => {
    const isAdminPage = false
    return(

        <div className="analyze">
            <Header isAdminPage={isAdminPage}/>
            <Outlet/>
        </div>
    )
}

export default AdminLayout