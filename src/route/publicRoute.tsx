import { Navigate, Outlet } from "react-router-dom";
import { getRoleId } from "../utils/commonUtil";
type props = {
  token: any
  redirectPath?: string
  roleId?: any
}

const PublicRoute = ({ token, redirectPath = '/dashboard', roleId }: props) => {
  if (token && token != null && token !== undefined) {
    return <Navigate to={getRoleId() === 2 ? "/myAssignment" : (getRoleId() === 1 || getRoleId() === 3) ? redirectPath : "/dashboard"} replace />;
  }

  return <Outlet />;
};
export default PublicRoute;
