import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import ProtecedRoutesAdmin from "./ProtecedRoutesAdmin.tsx";
import AdminLayout from "../AdminDashboard/pages/AdminLayout.tsx";

import loadingPage from "../elements/loadingPage.tsx";
import ErrorPageAdmin from "../AdminDashboard/pages/ErrorPageAdmin.tsx";
import Layout from "../elements/Layout.tsx";
import ProtecedRoutes from "./ProtecedRoutes.tsx";

const ClusterTable = lazy(() => import("../AdminDashboard/elements/Data/ClusterTable.tsx"))
const ClusterEdit = lazy(() => import("../AdminDashboard/elements/Data/ClusterEdit.tsx"))
const LoginPage = lazy(() => import("../elements/LoginPage.tsx"))
const AdminMenu = lazy(() => import("../AdminDashboard/elements/AdminMenu.tsx"))
const UserTable = lazy(() => import("../AdminDashboard/elements/Users/UserTable.tsx"))
const UserEdit = lazy(() => import("../AdminDashboard/elements/Users/UserEdit.tsx"))
const AnalyzTable = lazy(() => import("../pages/AnalyzTable.tsx"))

const router = createBrowserRouter([
    {
        index: true,
        element: <Suspense fallback={loadingPage}><LoginPage/></Suspense>,

    },
    {
        path:"/admin",
        element: <Suspense fallback={loadingPage}><AdminLayout/></Suspense>,
        children: [
                {
                    index: true,
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
                    element: <ErrorPageAdmin/>,
                }
            ]
    },
    {
        path:"/analyz",
        element: <Suspense fallback={loadingPage}><Layout/></Suspense>,
        children: [
            {
                index: true,
                element: <ProtecedRoutes><AnalyzTable/></ProtecedRoutes>
            }
        ]
    }

])

export default router