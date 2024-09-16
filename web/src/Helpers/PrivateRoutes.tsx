import { useAuth } from "../Hooks";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes(): ReactElement {
  const { signed } = useAuth();

  return signed ? <Outlet /> : <Navigate to='/login' />
}