import {FC} from "react";
import { Outlet } from "react-router-dom";
import Header from "../elements/Header.tsx";



const AdminLayout: FC = () => {

    return(

        <div className="admin">
            <Header/>
            <Outlet/>
        </div>
    )
}

export default AdminLayout