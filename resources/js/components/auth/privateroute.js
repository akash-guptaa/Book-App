import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Error from "../error";
import AccessDenied from "../error/access-denied";
import AuthUser from "./authuser";


const ProtectedRoute = ({
    children,
    ...props
}) => {
    const { getCurdPermission, getKeywisePermission } = AuthUser();
    let status = true;
    
    if(props?.functionname == 'getCurdPermission'){
       status = getCurdPermission(props?.page ,props?.keyname);
    }



    if(props?.functionname == 'getKeywisePermission'){
        status = getKeywisePermission(props?.page);
     }
 console.log('getKeywisePermission :>> ', status);
    const passportToken = sessionStorage.getItem("passportToken");
    const tokenvalidation = () => {
        const token = sessionStorage.getItem("passportToken");
        const currentTime = new Date().getTime() / 1000;
        if (decodedToken.exp > currentTime) {
            /** todo add api refrence token
             * create function with return token
             * call api to get token
             * set new token in session storage
             * and headerpayload in header
              */
            // navigate(`/logout`);
            console.log('currentTime time out ', decodedToken.exp);
            return token;
        }
        else {
            console.log('currentTime time in ', decodedToken.exp, currentTime);
            return token;
        }
    }
    // const result = tokenvalidation();

    let isAuthenticated = false;
    if (passportToken != 'null' && passportToken != undefined) {
        isAuthenticated = true;
    }
    else {
        isAuthenticated = false;
    }
    if(!status) return (<AccessDenied />)
    if (!isAuthenticated) {
        return <Navigate to="/loginpage" />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;
