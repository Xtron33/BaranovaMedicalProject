import {FC} from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/Header.tsx";


import '../styles/AdminCluster.scss'
import '../styles/AdminEditor.scss'
import '../../styles/Page/Login.scss'
import "../../styles/Header.scss"
import "../styles/AdminMenu.scss"
import "../styles/AdminModal.scss"


import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

const AdminLayout: FC = () => {

    const isAdminPage = true;
    return (

        <div className="admin">
            <Header isAdminPage={isAdminPage}/>
            <Outlet/>
        </div>
    )
}

export default AdminLayout