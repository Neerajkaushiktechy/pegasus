import { Navigate, Outlet } from "react-router-dom";
import { checkToken } from "../utils/tokenExpUtils";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../redux/modules/auth/actions";
type props = {
  token: any
  redirectPath?: string
}

const ProtactiveRoute = ({ token, redirectPath = '/' }: props) => {
  let dispatch = useDispatch()
  if ((checkToken())) {
    dispatch(logoutRequest());
    localStorage.clear();
    return <Outlet />;
  }
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
export default ProtactiveRoute;