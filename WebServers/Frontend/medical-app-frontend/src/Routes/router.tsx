import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import ProtecedRoutesAdmin from "../component/ProtecedRoutesAdmin.tsx";
import AdminLayout from "../AdminDashboard/pages/AdminLayout.tsx";

import loadingPage from "../elements/loadingPage.tsx";
import ErrorPageAdmin from "../AdminDashboard/pages/ErrorPageAdmin.tsx";

const ClusterTable = lazy(() => import("../AdminDashboard/elements/Data/ClusterTable.tsx"))
const ClusterEdit = lazy(() => import("../AdminDashboard/elements/Data/ClusterEdit.tsx"))
const LoginPage = lazy(() => import("../AdminDashboard/elements/LoginPage.tsx"))
const AdminMenu = lazy(() => import("../AdminDashboard/elements/AdminMenu.tsx"))
const UserTable = lazy(() => import("../AdminDashboard/elements/Users/UserTable.tsx"))
const UserEdit = lazy(() => import("../AdminDashboard/elements/Users/UserEdit.tsx"))

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
                    element: <ProtecedRoutesAdmin><ClusterTable/></ProtecedRoutesAdmin>
                },
                {
                    path:"/admin/cluster/new",
                    element: <ProtecedRoutesAdmin><ClusterEdit/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/cluster/change/:dataId",
                    element:  <ProtecedRoutesAdmin><ClusterEdit/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/users",
                    element:  <ProtecedRoutesAdmin><UserTable/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/users/new",
                    element:  <ProtecedRoutesAdmin><UserEdit/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/users/change/:id",
                    element:  <ProtecedRoutesAdmin><UserEdit/></ProtecedRoutesAdmin>
                },
                {
                    path: "*",
                    element: <ErrorPageAdmin/>
                }
            ]



    },

])

export default router