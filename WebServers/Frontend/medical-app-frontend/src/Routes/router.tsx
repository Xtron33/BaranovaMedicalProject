import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import ProtecedRoutesAdmin from "../component/ProtecedRoutesAdmin.tsx";
import AdminLayout from "../AdminDashboard/pages/AdminLayout.tsx";

import loadingPage from "../elements/loadingPage.tsx";
import ErrorPageAdmin from "../AdminDashboard/pages/ErrorPageAdmin.tsx";

const ClusterEdit = lazy(() => import("../AdminDashboard/elements/Data/ClusterEdit.tsx"))
const DataChange = lazy(() => import("../AdminDashboard/elements/Data/DataChange.tsx"))
const LoginPage = lazy(() => import("../AdminDashboard/elements/LoginPage.tsx"))
const AdminMenu = lazy(() => import("../AdminDashboard/elements/AdminMenu.tsx"))
const UserEdit = lazy(() => import("../AdminDashboard/elements/Users/UserEdit.tsx"))
const UserChange = lazy(() => import("../AdminDashboard/elements/Users/ChangeUsers.tsx"))

const router = createBrowserRouter([
    {
        path:"/",
        element: <>HelloWorld</>
    },
    {
        path:"/admin",
        element: <Suspense fallback={loadingPage}><AdminLayout/></Suspense>,
        errorElement: <ErrorPageAdmin/>,
        children: [
                {
                    index: true,
                    element: <LoginPage/>,
                },
                {
                    path:"/admin/menu",
                    element: <ProtecedRoutesAdmin><AdminMenu/></ProtecedRoutesAdmin>
                },
                {
                    path:"/admin/cluster",
                    element: <ProtecedRoutesAdmin><ClusterEdit/></ProtecedRoutesAdmin>
                },
                {
                    path:"/admin/cluster/new",
                    element: <ProtecedRoutesAdmin><DataChange/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/cluster/change/:dataId",
                    element:  <ProtecedRoutesAdmin><DataChange/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/users",
                    element:  <ProtecedRoutesAdmin><UserEdit/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/users/new",
                    element:  <ProtecedRoutesAdmin><UserChange/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/users/change/:id",
                    element:  <ProtecedRoutesAdmin><UserChange/></ProtecedRoutesAdmin>
                },
                {
                    path: "*",
                    element: <ErrorPageAdmin/>
                }
            ]



    },

])

export default router