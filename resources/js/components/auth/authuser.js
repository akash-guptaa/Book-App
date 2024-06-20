import axios from "axios";
import { useState } from "react";
import { useNavigate, link } from "react-router-dom";

export default function AuthUser() {
    const navigate = useNavigate();
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = JSON.stringify(tokenString);
        return userToken;
    };

    const getUser = () => {
        const userString = sessionStorage.getItem("user");
        const user_detail = JSON.stringify(userString);
        return user_detail;
    };

    const getCurrentUser = () => {
        let user = null;
        try {
            console.log(localStorage, "kkk");
            user =
            sessionStorage.getItem("user") != null
                    ? JSON.parse(sessionStorage.getItem("user"))
                    : null;
            console.log(user, 'getCurrentUser---------------------------------------');
        } catch (error) {
            console.log("error---", error);
            user = null;
        }
        return user;
    };
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        console.log('token new', token)
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("passportToken", token);
        console.log("Session Loging readirect to dashboard", sessionStorage)
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        sessionStorage.clear();
        setToken(null);
        setUser(null);
        console.log("Session Loging out  beore Redirect");
        navigate("/loginpage");
    };

    const http = axios.create({

        baseURL: process.env.MIX_REACT_APP_API_BASE_URL,
        //baseURL: "http://localhost:8000/api/v1",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    /// get Curd permission value
    const getCurdPermission = (key,name) => {
        let currentUser = null;
        const logindetail = sessionStorage.getItem("user");
        if(logindetail && logindetail) {
            currentUser = JSON.parse(logindetail);  
        }
        // else if(userstatedetails && userstatedetails?.status == true) {
        //     currentUser = userstatedetails?.statedata;  
        // }

        let permission_json = (currentUser && currentUser?.permission_json) ? JSON.parse(currentUser?.permission_json) : [];
        console.log('permission_json',logindetail);
        if(!permission_json[key]) return false;
        
        return permission_json[key][name] ?? false;

    }

    // get keywise permission value
 const getKeywisePermission = (key,value) => {  
    let currentUser = null;
    const logindetail = sessionStorage.getItem("user");
    if(logindetail && logindetail) {
        currentUser = JSON.parse(logindetail);  
    }
    console.log('getKeywisePermission',currentUser);
  let permission_json = (currentUser && currentUser?.permission_json)? JSON.parse(currentUser?.permission_json) : [];

  let permission = false;

  console.log("permission check",key);

  console.log("permission check",permission_json);

  console.log("permission value",value, permission_json[key]);

  switch (permission_json[key]) {
      
      case "Allow":
          permission = true;
      break;

      case "Disallow":
          permission = false;
      break;

    //   case "All":
    //       permission = true;
    //   break;

    //   case "None":
    //       permission = false;
    //   break;

    //   case "My Request":
    //       if(value && value?.user_id == currentUser?.user_id){
    //           permission = true;
    //       }
    //   break;

      default:
          permission = permission_json[key];
      break;
  }
  console.log("permission check now",permission);

  return permission;

}



    return {
        setToken,
        saveToken,
        token,
        user,
        getToken,
        http,
        //isLoggedIn,
        logout,
        getCurdPermission,
        getKeywisePermission,
        getCurrentUser,
        
    };
}
