
import { Navigate } from "react-router-dom";
import userStore from "../store/userStore";
import React from "react";

const AuthValidate = ({ children }: { children: React.ReactNode }) => {
    const isAuth = userStore.isAuth;

    if (isAuth) {
        return children;
    }
    return <Navigate to={'/auth/login'} replace />;
};

export default AuthValidate;