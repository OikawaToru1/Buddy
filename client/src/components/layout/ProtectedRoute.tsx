import {Outlet, Navigate} from "react-router";
import authSlice from "../../rtk/slice/authSlice";
import type { RootState } from "../../rtk/store";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}