import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext } from "../App";

export const PrivateRoutes = () => {
    const { token } = useContext(TokenContext);
    return token ? <Outlet /> : <Navigate to="/" />;
};