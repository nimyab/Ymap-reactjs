import { Navigate, useLocation } from "react-router-dom";
import userStore from "../store/userStore";
import React from "react";

const AdminValidate = ({ children }: { children: React.ReactNode }) => {
    const userRole = userStore.user.role;
    const location = useLocation();
    console.log(location);

    if (userRole === "ADMIN") {
        return children;
    }
    return <Navigate to={location.pathname} replace />;
};

export default AdminValidate;
