import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthUser from "../../../js/components/auth/authuser";
import LoginIndex from "../../components/auth";


const PublicRoute = ({
    children
}) => {

    const passportToken = sessionStorage.getItem("passportToken");
    if (passportToken) {
        return <Navigate replace to="/dashboard" />;
    } else {
        return <Navigate replace to="/loginpage" />;
    }
};
export default PublicRoute;