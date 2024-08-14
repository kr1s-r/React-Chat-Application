import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouterProps = PropsWithChildren;

function PrivateRoute({ children } : PrivateRouterProps) {
  const { user } = useAuth();
  const location = useLocation();

  // if user is not authenticated
  if (user === null) {
    if (location.pathname === "/chat") {
      return <Navigate to="/" replace={true} /> // can use useNavigate()
    }

    return children
  }

  // if user is authenticated
  if (user) {
    if (location.pathname === "/") {
      return <Navigate to="/chat" replace={true} />
    }

    return children
  }
}

export default PrivateRoute;