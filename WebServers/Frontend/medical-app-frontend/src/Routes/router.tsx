import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import ProtecedRoutesAdmin from "../component/ProtecedRoutesAdmin.tsx";
import AdminLayout from "../AdminDashboard/pages/AdminLayout.tsx";

import loadingPage from "../elements/loadingPage.tsx";

const AdminMain = lazy(() => import("../AdminDashboard/elements/AdminMain.tsx"))
const DataChange = lazy(() => import("../AdminDashboard/elements/DataChange.tsx"))
const LoginPage = lazy(() => import("../AdminDashboard/elements/LoginPage.tsx"))
const AdminMenu = lazy(() => import("../AdminDashboard/elements/AdminMenu.tsx"))

const router = createBrowserRouter([
    {
        path:"/",
        element: <>HelloWorld</>
    },
    {
        path:"/admin",
        element: <Suspense fallback={loadingPage}><AdminLayout/></Suspense>,
        errorElement: <div>404</div>,
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
                    element: <ProtecedRoutesAdmin><AdminMain/></ProtecedRoutesAdmin>
                },
                {
                    path:"/admin/cluster/new",
                    element: <ProtecedRoutesAdmin><DataChange/></ProtecedRoutesAdmin>
                },
                {
                    path: "/admin/cluster/change/:dataId",
                    element:  <ProtecedRoutesAdmin><DataChange/></ProtecedRoutesAdmin>
                }
            ]



    },

])

export default router