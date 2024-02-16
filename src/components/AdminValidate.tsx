import { Navigate } from "react-router-dom";
import userStore from "../store/userStore";
import React from "react";

const AdminValidate = ({ children }: { children: React.ReactNode }) => {
    const userRole = userStore.user.role;

    if (userRole === "ADMIN") {
        return children;
    }
    return <Navigate to={'/'} replace />;
};

export default AdminValidate;
