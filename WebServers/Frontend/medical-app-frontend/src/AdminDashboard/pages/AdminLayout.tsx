import {FC} from "react";
import { Outlet } from "react-router-dom";
import Header from "../elements/Header.tsx";


import '../styles/Admin.scss'
import '../styles/Changer.scss'
import '../styles/Login.scss'
import "../styles/AdminHeader.scss"
import "../styles/AdminMenu.scss"

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

const AdminLayout: FC = () => {

    return(

        <div className="admin">
            <Header/>
            <Outlet/>
        </div>
    )
}

export default AdminLayout