import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {useRole} from "../hooks/useRole.ts";

type Props = {
    children: JSX.Element;
};

const ProtecedRoutesAdmin: React.FC<Props> = ({children}) => {
    const isAuth = useAuth();
    const role = useRole()

   return isAuth && role==="admin" || role==="super-admin"? children :  <Navigate to={"/admin"} replace/>
}

export default ProtecedRoutesAdmin;