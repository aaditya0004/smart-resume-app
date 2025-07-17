import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return userInfo && userInfo.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;