import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import loadingPage from "../elements/loadingPage.tsx";

const AdminMain = lazy(() => import("../AdminDashboard/elements/AdminMain.tsx"))
const DataChange = lazy(() => import("../AdminDashboard/elements/DataChange.tsx"))
const LoginPage = lazy(() => import("../AdminDashboard/elements/LoginPage.tsx"))

const router = createBrowserRouter([
    {
        path:"/",
        element: <>HelloWorld</>
    },
    {
        path:"/admin",
        element: <Suspense fallback={loadingPage}><AdminMain/></Suspense>
    },
    {
        path:"/admin/login",
        element: <Suspense fallback={loadingPage}><LoginPage/></Suspense>
    },
    {
        path:"/admin/new",
        element: <Suspense fallback={loadingPage}><DataChange/></Suspense>
    },
    {
        path: "/admin/change/:dataId",
        element: <Suspense fallback={loadingPage}><DataChange/></Suspense>
    }
])

export default router