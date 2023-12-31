import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import ProtecedRoutesAdmin from "./ProtecedRoutesAdmin.tsx";
import AdminLayout from "../AdminDashboard/elements/AdminLayout.tsx";

import loadingPage from "../elements/loadingPage.tsx";
import ErrorPageAdmin from "../AdminDashboard/elements/ErrorPageAdmin.tsx";
import Layout from "../component/Layout.tsx";
import ProtecedRoutes from "./ProtecedRoutes.tsx";

const ClusterTable = lazy(() => import("../AdminDashboard/pages/Data/ClusterTable.tsx"))
const ClusterEdit = lazy(() => import("../AdminDashboard/pages/Data/ClusterEdit.tsx"))
const LoginPage = lazy(() => import("../pages/LoginPage.tsx"))
const AdminMenu = lazy(() => import("../AdminDashboard/pages/AdminMenu.tsx"))
const UserTable = lazy(() => import("../AdminDashboard/pages/Users/UserTable.tsx"))
const UserEdit = lazy(() => import("../AdminDashboard/pages/Users/UserEdit.tsx"))
const AdminRecords = lazy(() => import("../AdminDashboard/pages/Records/RecordsTable.tsx"))
const AnalyzTable = lazy(() => import("../pages/Analyz/AnalyzTable.tsx"))
const AnalyzViewer = lazy(() => import("../pages/Analyz/AnalyzViewer.tsx"))

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
                    path: "/admin/records",
                    element:  <ProtecedRoutesAdmin><AdminRecords/></ProtecedRoutesAdmin>
                },

            ]
    },
    {
        path:"/analyz",
        element: <Suspense fallback={loadingPage}><Layout/></Suspense>,
        children: [
            {
                index: true,
                element: <ProtecedRoutes><AnalyzTable/></ProtecedRoutes>
            },
            {
                path:"/analyz/new",
                element: <ProtecedRoutes><AnalyzViewer/></ProtecedRoutes>
            },
            {
                path:"/analyz/record/:id",
                element: <ProtecedRoutes><AnalyzViewer/></ProtecedRoutes>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPageAdmin/>,
    }

])

export default router