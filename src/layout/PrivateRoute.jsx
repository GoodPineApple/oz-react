import { Outlet, Navigate } from "react-router-dom";

// 가드 컴포넌트
function PrivateRoute({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
